<?php
/*
Template Name: News Page
*/
?>
<?php get_header() ?>
		<div class="content"><?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<div class="entry-content">
<?php the_content(); ?>
<?php
global $post;
$args = array( 'numberposts' => 1, 'category' => 4 );
$myposts = get_posts( $args );
foreach( $myposts as $post ) :	setup_postdata($post); ?>
	<div class="post-title"><?php the_title(); ?></div>
	<?php the_content(); ?>
<?php endforeach; ?>
				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>