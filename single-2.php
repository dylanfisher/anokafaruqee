<?php get_header() /* Books Single Post */
?>
		<div class="content">
<?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<div class="entry-content">
				
<?php if(get_field('paintings')): ?>
	<?php while(has_sub_field('paintings')): ?>
					<div class="painting-container" data-date="<?php the_sub_field('year'); ?>" data-size="<?php the_sub_field('size'); ?>">
						<a class="popup" href="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image_main"),'anoka-painting-lightbox-desk-medium',false); echo $image_src[0]; ?>" details="<?php the_sub_field('title'); ?><br><?php the_sub_field('year'); ?><br><?php the_sub_field('medium'); ?><br><?php the_sub_field('size'); ?>">
							<img src="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image_main"),"anoka-painting-thumb",false); echo $image_src[0]; ?>" />
						</a>
						<div class="title"><?php the_sub_field('title'); ?></div>
					</div>
	<?php endwhile; ?>
<?php endif; ?>

				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>