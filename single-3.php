<?php get_header() /* Information Single Post */
?>
		<div class="content">
<?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<div class="entry-content">
<?php the_content() ?>

<?php if(get_field('resume_section')): ?>
	<?php while(has_sub_field('resume_section')): ?>
					<div class="resume-section">
						<div class="title">
		<?php the_sub_field('title'); ?>
		<?php if (get_sub_field('anchor_link_name') != "") { ?>
							<span id="<?php the_sub_field('anchor_link_slug'); ?>" class="jump-link-offset"></span>
		<?php } ?>
						</div>
		<?php if(get_sub_field('sub_section')): ?>
			<?php while(has_sub_field('sub_section')): ?>
						<div class="resume-sub-section">
							<div class="year"><?php the_sub_field('year'); ?></div>
							<div class="resume-content"><?php the_sub_field('content'); ?></div>						
						</div>
			<?php endwhile; ?>
		<?php endif; ?>
					</div>
	<?php endwhile; ?>
<?php endif; ?>

				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>