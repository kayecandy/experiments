<?php
    include('config.php');

?>


<div id="cndce-gloves-container" class="cndce-container" data-active-editable="color">


    <div class="cndce-top-controls">
        <?php foreach($CONFIG['top-controls'] as $topControl): ?>
            <div class="cndce-top-control">
                <?php include($topControl['icon']) ?>
                <div class="cndce-top-control--title"><?= $topControl['title'] ?></div>
            </div>
        <?php endforeach; ?>
    </div>

    <div class="cndce-controls-panel">
        <div class="cndce-controls-headers-wrapper">
            <div class="cndce-controls-headers nav" role="tablist">
                <?php foreach($CONFIG['controls'] as $control): ?>
                    <a 
                        class="nav-link <?= $control['active'] ? 'active' : '' ?>" 
                        href="#<?= $control['id'] ?>"
                        role="tab"
                        data-bs-toggle="tab"
                    >
                        <div class="cndce-controls-header">
                            <?php include($control['icon'])  ?>
                            <div class="cndce-controls-header--title"><?= $control['title'] ?></div>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>

        </div>
        <div class="cndce-controls-content">
            <div class="tab-content">
                <?php foreach($CONFIG['controls'] as $control): ?>
                    <div
                        id="<?= $control['id'] ?>"
                        class="tab-pane fade py-3 <?= $control['active'] ? 'show active' : '' ?>"
                        role="tab-panel"
                    >
                        <?php include('controls/control-' . $control['id'] . '.php') ?>
                    </div>
                <?php endforeach; ?>

            </div>
        </div>
    </div>

</div>