import React from 'react'

const HomeNavbar = () => {
  return (
    <>
    
  <header class="navbar navbar-expand-lg fixed-top header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            <a href="index.html" class="logo img-fluid">
              <img src="assets/images/logo-tech.png" class="img-fluid custom-logo" alt="Chain App Dev" />
            </a>
            
            <ul class="nav">
              <li class="scroll-to-section"><a href="index.html" class="text-primary">Home</a></li>
              <li class="scroll-to-section"><a href="service.html">Services</a></li>
              <li class="scroll-to-section"><a href="support.html"  >Solution</a></li>
              <li class="scroll-to-section"><a href="about.html">About</a></li>
              <li class="scroll-to-section"><a href="contact.html">Contact us</a></li>

            </ul>
            <a class='menu-trigger'>
              <span>Menu</span>
          </a>  
          </nav>
        </div>
      </div>
    </div>
  </header>
  

  <div class="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-6 align-self-center">
              <div class="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                <div class="row">
                  <div class="col-lg-12">
                    <img src="" alt="" />
                    <h2> <div class="bebas-neue-regular-2 "> Welcome to</div> <div class="bebas-neue-regular"> Techzen Technologies</div> </h2>
                  </div> 
                  <div class="col-lg-12">
                      <a href="about.html">About</a>
                    </div>
                    <div class="white-button scroll-to-section ">
                      <a href="service.html">Service <i class="fab fa-google-play btn-secondry"></i></a>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                <img src="all images/banner-right-image.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      
    </>
  )
}

export default HomeNavbar
