<script setup lang="ts">
import UpfooterView from '../../organisms/footer-teils/UpFooterView.vue'
</script>

<template>
  <div class="footer">
    <div class="container-fluid">
      <UpfooterView />
      <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12">
          <ul class="social-media">
            <li>
              <a href="https://www.facebook.com/mygarden"><i class="fab fa-facebook-f"></i></a>
            </li>
            <li>
              <a href="https://www.instagram.com/mygarden"><i class="fab fa-instagram"></i></a>
            </li>
            <li>
              <a href="https://twitter.com/mygarden"><i class="fab fa-twitter"></i></a>
            </li>
          </ul>

          <div class="a">
            <div class="copyright">
              <p>&copy; 2024 GallusGarten</p>
            </div>

            <div class="developer-info">
              <p>
                Developed by
                <a href="https://seointro.de/api/" title="Made with ❤️ by Saeed Heidarizarei"
                  >SEOintro</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css';
h1,
h2,
h3,
h4,
h5,
h6 {
}
a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  outline: none;
}

a,
a:active,
a:focus {
  color: #333;
  text-decoration: none;
  transition-timing-function: ease-in-out;
  -ms-transition-timing-function: ease-in-out;
  -moz-transition-timing-function: ease-in-out;
  -webkit-transition-timing-function: ease-in-out;
  -o-transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  -ms-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
img {
  max-width: 100%;
  height: auto;
}
section {
  padding: 60px 0;
  /* min-height: 100vh;*/
}
.footer {
  background: linear-gradient(105deg, #2ecc71, #295641);

  padding-top: 40px;
  padding-bottom: 40px;
}
/*END FOOTER SOCIAL DESIGN*/
.single_footer {
}
@media only screen and (max-width: 768px) {
}

.social-media {
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  margin-top: 25px;
  padding-top: 25px;
  text-align: center;
}

.social-media li {
  display: inline-block;
  margin-right: 10px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
  padding-top: 4px;
}

.social-media li a {
  color: #fff;
}

.social-media li:hover {
  background: #2ecc71;
  border: 1px solid #295641;
  color: #fff;
  border: 0px;
}
/*END SOCIAL PROFILE CSS*/
.copyright {
  padding-top: 10px;
  color: #fff;
  font-size: 15px;

  text-align: center;
}
.copyright a {
  color: #2ecc71;
  transition: all 0.2s ease 0s;
}
.copyright a:hover {
  color: #295641;
}

.copyright p {
  margin: 0px;
  margin-top: 2px;
}

.developer-info {
  font-size: 12.5px;
  color: #fff;
  text-align: center;
}
.developer-info a {
  color: #2ecc71;
  transition: all 0.2s ease 0s;
}
.developer-info a:hover {
  color: #295641;
  background-color: transparent;
}
</style>
