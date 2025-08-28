# 🛒 ShopX - MERN E-Commerce Platform

<html>
<head>
<style>
@keyframes fade {
  0% {opacity: 0;}
  10% {opacity: 1;}
  25% {opacity: 1;}
  35% {opacity: 0;}
  100% {opacity: 0;}
}
.slider {
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 400px;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(255,255,255,0.3);
}
.slider img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  animation: fade 16s infinite;
}
.slider img:nth-child(1) { animation-delay: 0s; }
.slider img:nth-child(2) { animation-delay: 4s; }
.slider img:nth-child(3) { animation-delay: 8s; }
.slider img:nth-child(4) { animation-delay: 12s; }
h1, h2, h3, p {
  text-align: center;
  color: #fff;
}
body {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  font-family: Arial, sans-serif;
  padding: 20px;
  color: #fff;
}
</style>
</head>
<body>

<h1>✨ ShopX ✨</h1>
<p>A modern <b>MERN Stack</b> e-commerce platform with cart, authentication, and order management.</p>

<div class="slider">
  <img src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1756385704/home_rbh4os.png" alt="Home Page">
  <img src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1756385997/login_xl30zx.png" alt="Login Page">
  <img src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1756385998/cart_kd6hvq.png" alt="Cart Page">
  <img src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1756386190/orders_rhrtqx.png" alt="Orders Page">
</div>

<h2>🌐 Live Demo</h2>
<p><a href="https://e-commerce-mern-beta.vercel.app" target="_blank">Visit ShopX</a></p>

<h2>👨‍💻 Contributors</h2>
<ul>
  <li><a href="https://github.com/Shashidharak89">@Shashidharak89</a> - Shashidhara K</li>
  <li><a href="https://github.com/Prakashmonis05">@Prakashmonis05</a> - Prakash Monis</li>
  <li><a href="https://github.com/sankethkul">@sankethkul</a> - Sanketh Kul</li>
</ul>

</body>
</html>
