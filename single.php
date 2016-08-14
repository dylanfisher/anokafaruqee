<?php get_header() ?>
		<div class="content">
<?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<div class="entry-content">
<?php the_content() ?>
				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>