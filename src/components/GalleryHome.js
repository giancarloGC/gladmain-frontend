import React,{ Fragment } from 'react';

import { Image } from "react-bootstrap";
import "./../assets/GridLayoutMotion-master/favicon.ico";
import Jola from "./../assets/GridLayoutMotion-master/img/1.jpg";

export default function GalleryHome(){
    return(
        <Fragment>
		<body className="loading">
		<main>
			<div className="content">
				<div className="grid">
					<a className="grid__item" href="#preview-1">
						<div className="box">
							<div className="box__shadow"></div>
							<Image className="box__img" src={Jola} alt="Some image"/>
							<h3 className="box__title"><span className="box__title-inner" data-hover="Memo">Memo</span></h3>
							<h4 className="box__text"><span className="box__text-inner">Beast</span></h4>
							<div className="box__deco">&#10014;</div>
							<p className="box__content">"Sometimes we go surfing when it's stormy weather"</p>
						</div>
					</a>
				</div>
			</div>

			<div className="overlay">
				<div className="overlay__reveal"></div>
				<div className="overlay__item" id="preview-1">
					<div className="box">
						<div className="box__shadow"></div>
						<Image className="box__img box__img--original" src={Jola} alt="Some image"/>
						<h3 className="box__title"><span className="box__title-inner">Memo</span></h3>
						<h4 className="box__text"><span className="box__text-inner">Beast</span></h4>
						<div className="box__deco">&#10014;</div>
					</div>
					<p className="overlay__content">It's time the tale were told of how you took a child and you made him old.</p>
				</div>
				<button className="overlay__close"><svg className="icon icon--cross"><use href="#icon-cross"></use></svg></button>

			</div>

		</main>
		</body>
		<script src="./../assets/GridLayoutMotion-master/js/imagesloaded.pkgd.min.js"></script>
		<script src="./../assets/GridLayoutMotion-master/js/TweenMax.min.js"></script>
		<script src="./../assets/GridLayoutMotion-master/js/demo.js"></script>
        </Fragment>
    );
}