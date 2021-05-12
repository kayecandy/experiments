<div class="cndce-top-controls">
    <?php foreach(CONFIG['top-controls'] as $topControl): ?>
        <div class="cndce-top-control">
            <?php include( __DIR__ . '/../' . $topControl['icon']) ?>
            <div class="cndce-top-control--title"><?= $topControl['title'] ?></div>
        </div>
    <?php endforeach; ?>
</div>