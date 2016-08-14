<?php get_header() ?>
		<div class="content">
<?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<div class="entry-content">
				
<?php // Writing
if ( is_page( 35 ) ) { ?>
	<?php
	global $post;
	$args = array( 'numberposts' => 1, 'category' => 6 );
	$myposts = get_posts( $args );
	foreach( $myposts as $post ) :	setup_postdata($post); ?>
		<div class="post-title"><?php the_title(); ?></div>
		<?php the_content(); ?>
	<?php endforeach; ?>
<?php }

// Information
else if ( is_page( 37 ) ) {
?>
	<?php
	global $post;
	$args = array( 'numberposts' => 1, 'category' => 3 );
	$myposts = get_posts( $args );
	foreach( $myposts as $post ) :	setup_postdata($post); ?>
		<div class="post-title"><?php the_title(); ?></div>
		<?php the_content(); ?>
	<?php endforeach; ?>
<?php }

else {
?>
	<?php the_content(); ?>
<?php } ?>
				</div>
			</section><!-- .post -->
<?php if ( get_post_custom_values('comments') ) comments_template() // Add a key+value of "comments" to enable comments on this page ?>
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>