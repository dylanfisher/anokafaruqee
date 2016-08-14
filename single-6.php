<?php get_header() /* Writing Single Post */
?>
		<div class="content">
<?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<div class="entry-content">
					<div class="post-title"><?php the_title() ?></div>
<?php the_content() ?>
				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>