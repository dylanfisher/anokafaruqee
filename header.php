<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title><?php wp_title( '-', true, 'right' ); echo wp_specialchars( get_bloginfo('name'), 1 ) ?></title>
	<meta name="description" content="Anoka Faruqee is a painter who lives and works in New Haven, CT and Brooklyn, NY. She has exhibited her work in the US and abroad, including Leo Koenig Gallery (New York), Hosfelt Gallery (San Francisco), the PS1 Museum (Queens), and Albright-Knox Gallery (Buffalo). She received her MFA from Tyler School of Art in 1997 and her BA from Yale University in 1994. She attended the Whitney Independent Study Program, the Skowhegan School of Art, and the PS1 National Studio Program. Grants include the Pollock Krasner Foundation and Artadia. Faruqee is currently an Associate Professor at the Yale School of Art. She has also taught at the School of the Art Institute of Chicago and Cal Arts, where she was Co-Director of the Art Program.">
	<meta name="keywords" content=" Anoka Faruqee, Artist, Painter, Painting, Abstraction, Leo Koenig Gallery, Hosfelt Gallery, Yale University, New York, NYC, Brooklyn, New Haven">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<link rel="icon" type="image/png" href="<?php echo get_bloginfo('template_url'); ?>/favicon.png">
	<link rel="stylesheet" type="text/css" href="<?php echo  bloginfo('stylesheet_url'); ?>" />
	<script>document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';</script>
	<script src="<?php echo get_bloginfo('template_url'); ?>/js/modernizr.custom.07657.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="<?php echo get_bloginfo('template_url'); ?>/js/jquery-1.9.1.min.js"><\/script>')</script>
	<script src="<?php echo get_bloginfo('template_url'); ?>/js/queryloader2.js"></script>
<?php wp_head() // For plugins ?>
</head>
<body class="<?php sandbox_body_class() ?>">
	<!--[if lt IE 7]>
		<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
	<![endif]-->
	<div class="wrapper">
		<header>
			<h1 class="site-title"><span><a href="<?php bloginfo('home') ?>/" rel="home"><img src="<?php echo get_site_url(); ?>/wp-content/uploads/af_logotype_v2.png" alt="Anoka Faruqee" /></a></span></h1>
			<nav class="main-nav clearfix">
				<?php wp_nav_menu(); ?>

<?php // Sub menu for Paintings pages excluding Diptychs/Triptychs
if ( is_page( 33 ) || is_page( 86 ) || has_category( 5 ) && ! has_category( '11' ) ) { ?>
					<ul class="sub-menu">
	<?php
	global $post;
	$args = array( 'numberposts' => -1, 'category' => 5 );
	$myposts = get_posts( $args );
	foreach( $myposts as $post ) :	setup_postdata($post); ?>
						<li class="nav-sub-item category-nav"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
	<?php endforeach; wp_reset_postdata(); ?>
						<ul class="nav-sub-container">
								<li class="nav-sub-item sort sort_by_size">view by <a href="#size">size</a></li> /
								<li class="nav-sub-item sort sort_by_date"><a href="#date">date</a></li>
						</ul>
					</ul>
<?php } ?>
<?php // Sub menu or Diptychs/Triptychs painting page only
if ( has_category( '11' ) ) { ?>
					<ul class="sub-menu">
	<?php
	global $post;
	$args = array( 'numberposts' => -1, 'category' => 5 );
	$myposts = get_posts( $args );
	foreach( $myposts as $post ) :	setup_postdata($post); ?>
						<li class="nav-sub-item category-nav"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
	<?php endforeach; wp_reset_postdata(); ?>
						<ul class="nav-sub-container">
								<li class="nav-sub-item sort sort_by_date">view by <a href="#date">date</a></li> /
								<li class="nav-sub-item sort sort_by_type"><a href="#type">type</a></li>
						</ul>
					</ul>
<?php } ?>
<?php // Texts
if ( is_page( 35 ) || has_category ( 6 ) ) { ?>
					<ul class="sub-menu">
	<?php
	global $post;
	$args = array( 'numberposts' => -1, 'category' => 6 );
	$myposts = get_posts( $args );
	foreach( $myposts as $post ) :	setup_postdata($post); ?>
						<?php if (get_field('pdf_link') == '') { ?><li class="nav-sub-item category-nav"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li><?php } ?>
						<?php if (get_field('pdf_link') != '') { ?><li class="nav-sub-item category-nav"><a href="<?php the_field('pdf_link'); ?>" target="_blank"><?php the_title(); ?></a></li><?php } ?>
	<?php endforeach; wp_reset_postdata(); ?>
					</ul>
<?php } ?>
<?php // Press
if ( is_page( 36 ) || has_category(4) ) { ?>
					<ul class="sub-menu">
	<?php
	global $post;
	$args = array( 'numberposts' => -1, 'category' => 4 );
	$myposts = get_posts( $args );
	foreach( $myposts as $post ) :	setup_postdata($post); ?>
						<li class="nav-sub-item category-nav"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
	<?php endforeach; wp_reset_postdata(); ?>
					</ul>
<?php } ?>
<?php // Information
if ( is_page( 37 ) || has_category ( 3 ) ) { ?>
					<ul class="sub-menu">
	<?php
	global $post;
	$args = array( 'numberposts' => -1, 'category' => 3 );
	$myposts = get_posts( $args );
	foreach( $myposts as $post ) :	setup_postdata($post); ?>
						<li class="nav-sub-item category-nav"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
	<?php endforeach; wp_reset_postdata(); ?>
					</ul>
<?php } ?>
<?php if(get_field('resume_section')): ?>
				<ul class="page-sub-menu jumplink">
	<?php while(has_sub_field('resume_section')): ?>
		<?php if (get_sub_field('anchor_link_name') != "") { ?>
					<li><a href="#<?php the_sub_field('anchor_link_slug'); ?>"><?php the_sub_field('anchor_link_name'); ?></a></li>
		<?php } ?>
	<?php endwhile; ?>
				</ul>
<?php endif; ?>
<?php if(get_field('sub_menu_link') || get_field('print_link')): ?>
				<ul class="page-sub-menu">
	<?php while(has_sub_field('sub_menu_link')): ?>
					<li><a href="<?php the_sub_field('link_url'); ?>"><?php the_sub_field('link_title'); ?></a></li>
	<?php endwhile; ?>
	<?php if( get_field('print_link') ) { ?>
					<li class="print-link"><a href="#" onClick="window.print();return false">print text</a></li>
	<?php } ?>
				</ul>
<?php endif; ?>
			</nav>
		</header>
