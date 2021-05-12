<div class="cndce-controls-top">
    <?php foreach(CONFIG['controls-top'] as $topControl): ?>
        <div class="cndce-control-top">
            <?php include( __DIR__ . '/../' . $topControl['icon']) ?>
            <div class="cndce-control-top--title"><?= $topControl['title'] ?></div>
        </div>
    <?php endforeach; ?>
</div>