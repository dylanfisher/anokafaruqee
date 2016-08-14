<?php
/*
Template Name: Paintings Page
*/
?>
<?php get_header() ?>
		<div class="content"><?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<div class="loading-animation"></div>
				<div class="entry-content">
<?php
global $post;
$args = array( 'numberposts' => 1, 'category' => 5 );
$myposts = get_posts( $args );
foreach( $myposts as $post ) :	setup_postdata($post); ?>
	<?php if(get_field('paintings')): ?>
		<?php while(has_sub_field('paintings')): ?>
					<div class="painting-container" data-date="<?php the_sub_field('year'); ?>" data-size="<?php the_sub_field('size'); ?>"  <?php if (get_sub_field('serial_number') != "") { ?>data-serial="<?php the_sub_field("serial_number"); ?>" <?php } ?>>
						<a class="popup" rel="gallery" <?php if (get_sub_field('image_detail_in_lightbox') != "") { ?>data-image-detail-in-lightbox="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image_detail_in_lightbox"),'anoka-painting-lightbox-desk-medium',false); echo $image_src[0]; ?>" <?php } ?> <?php if (get_sub_field('image_process') != "") { ?>data-image-process="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image_process"),'anoka-painting-lightbox-desk-medium',false); echo $image_src[0]; ?>" <?php } ?> <?php if (get_sub_field('serial_number') != "") { ?>data-serial="<?php the_sub_field("serial_number"); ?>" <?php } ?> href="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image_detail"),"anoka-painting-lightbox-desk-medium",false); echo $image_src[0]; ?>" details="<?php the_sub_field('title'); ?>; <?php the_sub_field('year'); ?>; <?php the_sub_field('medium'); ?>; <?php the_sub_field('size'); ?>&quot;">
							<img class="lazy" src="<?php bloginfo('template_url'); ?>/assets/gray.gif" data-original="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image_main"),"anoka-painting-thumb",false); echo $image_src[0]; ?>" width="<?php echo $image_src[1]; ?>" height="<?php echo $image_src[2]; ?>" />
							<noscript><img src="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image_main"),"anoka-painting-thumb",false); echo $image_src[0]; ?>"></noscript>
						</a>
						<div class="title"><?php the_sub_field('serial_number'); ?></div>
					</div>
		<?php endwhile; ?>
	<?php endif; ?>
<?php endforeach; wp_reset_postdata(); ?>
				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>