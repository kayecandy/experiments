class CNDCEScoreTimeseries extends CNDCEScoreTimeseriesBase {
  __data;
  __dataVisible = [];
  __svg;
  __dataRangeX;
  __dataRangeY;

  $cndceScoreTimeseries;
  $chartContainer;
  $usersList;
  $userListTemplate;

  $searchBox;
  $tooltip;

  constructor(params = {}) {
    super();

    // Assign default value
    Object.keys(params).forEach((paramKey) => {
      this["__" + paramKey] = params[paramKey];
    });

    this.__init();
  }

  __getDateExtent() {
    //   Min
    const min = d3.min(this.__data, (d) =>
      d3.min(d.scores, (score) => score.date)
    );

    //   Max
    const max = d3.max(this.__data, (d) =>
      d3.max(d.scores, (score) => score.date)
    );

    return [min, max];
  }

  __cloneTemplate($template) {
    const $clone = $template.clone(true);
    $clone.removeClass("template");

    return $clone;
  }

  __init() {
    $.ajax({
      url: "./data-500.json",
      dataType: "json",
      success: (res) => {
        console.log(res[0]);

        this.__initElements();
        this.__data = this.__initData(res);
        this.__initSize();
        this.__initD3();
      },
    });
  }

  __initElements() {
    this.$cndceScoreTimeseries = $(".cndce-score-timeseries");
    this.$chartContainer = $(
      ".cndce-chart-container",
      this.$cndceScoreTimeseries
    );
    this.$usersList = $(".cndce-users-list", this.$cndceScoreTimeseries);
    this.$userListTemplate = $(".cndce-user.template", this.$usersList);

    // Tooltip
    this.$tooltip = $(".cndce-tooltip", this.$chartContainer);

    const main = this;

    // Search
    this.$searchBox = $(".cndce-input-search", this.$cndceScoreTimeseries);

    console.log(this.$searchBox);

    this.$searchBox.on("input", function () {
      main.__data.forEach((d) => {
        const value = this.value.toLowerCase();

        if (
          d.name.toLowerCase().indexOf(value) == -1 &&
          d.id.toString().indexOf(value) == -1
        ) {
          d.$user.css({
            display: "none",
          });
        } else {
          d.$user.css({
            display: "",
          });
        }
      });
    });

    // User Checkbox Toggle
    this.$usersList.on("change", ".cndce-user", function () {
      const $checkbox = $("input", this);
      const $this = $(this);

      const d = $this.data("d3-data");

      if ($checkbox.is(":checked")) {
        main.__dataVisible.push(d);
        main.__updateD3();
        $this.data("d3-path").classList.add("hovered");
        // console.log($this.data("d3-path"));
      } else {
        main.__dataVisible.splice(main.__dataVisible.indexOf(d), 1);
        main.$cndceScoreTimeseries.removeClass("user-hover");
        $this.data("d3-path").classList.remove("hovered");
        main.__updateD3();
      }
    });

    // Hover Users
    this.$usersList.on("mouseenter", ".cndce-user", function () {
      main.$cndceScoreTimeseries.addClass("user-hover");
      const path = $(this).data("d3-path");
      if (path) {
        $(this).data("d3-path").classList.add("hovered");
      }
    });

    this.$usersList.on("mouseleave", ".cndce-user", function () {
      main.$cndceScoreTimeseries.removeClass("user-hover");
      const path = $(this).data("d3-path");

      if (path) {
        $(this).data("d3-path").classList.remove("hovered");
      }
    });

    // Hover path
    // this.$chartContainer.on("click", ".cndce-user-g", function () {
    //   const d = d3.select(this);
    //   console.log(d);
    //   // main.__dataVisible.splice(main.__dataVisible.indexOf(d), 1);
    //   // main.__updateD3();
    //   // $("input", d.$user).prop("checked", false);
    // });

    this.$chartContainer.on("mouseenter", ".cndce-user-g", function () {
      main.$cndceScoreTimeseries.addClass("user-hover");
      this.classList.add("hovered");
    });

    this.$chartContainer.on("mouseleave", ".cndce-user-g", function () {
      main.$cndceScoreTimeseries.removeClass("user-hover");
      this.classList.remove("hovered");
    });
  }

  __initData(data) {
    return data.map((d) => {
      //   Assign as Date()
      d.scores = d.scores.map(({ score, date }) => ({
        score: score,
        date: new Date(date),
      }));

      // Add color
      d.color = "hsl(" + Math.random() * 360 + ",100%,50%)";

      // Add to Users List
      const $user = this.__cloneTemplate(this.$userListTemplate);
      $(".cndce-user-name", $user).append(d.name);
      $(".cndce-user-id", $user).append(d.id);
      $(".checkmark", $user).css({
        backgroundColor: d.color,
      });
      this.$usersList.append($user);

      d.$user = $user;
      $user.data("d3-data", d);

      // Sort
      d.scores = d.scores.sort((a, b) => d3.ascending(a.date, b.date));

      return d;
    });
  }

  __initSize() {
    this.__width = this.$chartContainer.width();
    this.__height = window.innerHeight;
  }

  __initD3() {
    this.__dataRangeX = this.__getDateExtent();
    this.__dataRangeY = [0, 100];

    const x = d3
      .scaleTime()
      .domain(this.__dataRangeX)
      .range([this.__margins.left, this.__width - this.__margins.right]);

    const xAxis = (g) =>
      g
        .attr(
          "transform",
          `translate(0,${this.__height - this.__margins.bottom})`
        )
        .call(
          d3
            .axisBottom(x)
            .ticks(this.__width / 80)
            .tickSizeOuter(0)
        );

    this.__svg = d3
      .select(".cndce-chart-container")
      .append("svg")
      .attr("viewBox", [0, 0, this.__width, this.__height]);

    this.__svg.append("g").call(xAxis);

    this.__lineGroup = this.__svg.append("g");

    this.__updateD3();

    window.svg = this.__svg;
  }

  __updateD3() {
    const main = this;

    const t = this.__lineGroup
      .selectAll("g")
      .data(this.__dataVisible, (d) => d.id);

    this.__lineGroupEnter = t
      .enter()
      .append("g")
      .attr("class", "cndce-user-g")
      .on("click", function (e, d) {
        $("input", d.$user).prop("checked", false);
        main.__dataVisible.splice(main.__dataVisible.indexOf(d), 1);
        main.__updateD3();
        main.$tooltip.css({
          opacity: 0,
        });
        main.$cndceScoreTimeseries.removeClass("user-hover");
      })
      .each(function (d) {
        d.$user.data("d3-path", this);
      });

    t.exit().remove();

    this.__initLine();
  }

  __initLine() {
    const x = d3
      .scaleTime()
      .domain(this.__dataRangeX)
      .range([this.__margins.left, this.__width - this.__margins.right]);

    const y = d3
      .scaleLinear()
      .domain(this.__dataRangeY)
      .nice()
      .range([this.__height - this.__margins.bottom, this.__margins.top]);

    const tooltipX = (posX) => {
      return Math.min(
        this.$chartContainer.width() - this.__tooltipMinSize,
        posX
      );
    };

    const tooltipY = (posY) => {
      return Math.min(
        this.$chartContainer.height() - this.__tooltipMaxSize,
        posY
      );
    };

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.score));

    const main = this;

    this.__lineGroupEnter
      .append("path")
      .attr("class", "cndce-user-path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", (d) => line(d.scores));

    this.__lineGroupEnter
      .selectAll("dot")
      .data((d) => d.scores)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.score));

    this.__lineGroupEnter.each(function (d) {
      d3.select(this)
        .selectAll("circle")
        .attr("stroke", d.color)
        .attr("fill", "white")
        .attr("stroke-width", 2)
        .on("mouseover", function (e, dCircle) {
          d3.select(this).attr("fill", d.color);
          main.$tooltip.css({
            opacity: 1,
            left: tooltipX(e.clientX) + "px",
            top: tooltipY(e.clientY) + "px",
          });

          $(".cndce-tooltip-bar", main.$tooltip).css({
            backgroundColor: d.color,
          });

          $(".cndce-tooltip-name", main.$tooltip).html(d.name);
          $(".cndce-tooltip-id", main.$tooltip).html(d.id);
          $(".cndce-tooltip-date", main.$tooltip).html(
            dCircle.date.toLocaleDateString()
          );
          $(".cndce-tooltip-score", main.$tooltip).html(dCircle.score);

          console.log(e, d);
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "white");
          main.$tooltip.css({
            opacity: 0,
          });
        });
    });
  }
}
