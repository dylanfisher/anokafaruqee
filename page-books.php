<?php
/*
Template Name: Books Page
*/
?>
<?php get_header() ?>
		<div class="content"><?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<div class="entry-content">
<?php if(get_field('book')): ?>
	<?php while(has_sub_field('book')): $i++; ?>
					<article class="post-container">
						<h2 class="page-title"><?php the_sub_field('title'); ?></h2>
		<?php if(get_sub_field('book_images')): ?>
							<div class="book-images">
			<?php while(has_sub_field('book_images')): ?>
								<a class="popup book" rel="image-set<?php echo $i; ?>" <?php if (get_sub_field('serial_number') != "") { ?>data-serial="<?php the_sub_field("serial_number"); ?>" <?php } ?> href="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image"),'anoka-painting-lightbox-desk-medium',false); echo $image_src[0]; ?>"><img src="<?php $image_src = wp_get_attachment_image_src(get_sub_field("image"),"anoka-painting-thumb",false); echo $image_src[0]; ?>" /></a>
			<?php endwhile; ?>
								<p class="sub-title"><?php the_sub_field('caption'); ?></p>
							</div>
		<?php endif; ?>
						<div class="book-description"><?php the_sub_field('description'); ?></div>
					</article>
	<?php endwhile; ?>
<?php endif; ?>
				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>