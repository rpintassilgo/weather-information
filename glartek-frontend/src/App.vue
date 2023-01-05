<script setup>

</script>

<template>
  <div class="topbar">
        <marquee direction="up" scrolldelay="500" scrollamount="3" style="color: white;text-align:center">
            Registe-se para ter acesso a desconstos baseados em pontos
        </marquee>
    </div>

  <nav
    class="navbar navbar-light navbar-expand-md bg-light sticky-top flex-md-nowrap  shadow"
  >
    <a class="navbar-brand" href="#">Default</a>
  </nav>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style="margin-top: 5%;">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column" >
            <li class="nav-item">
              <div>
                <i class="bi bi-house"></i>
                Dashboard
              </div>
            </li>
            <li class="nav-item">
              <div>
                <i class="bi bi-file-text"></i>
                Orders <!-- Delivery Emplyee Orders -->
              </div>
            </li>
          </ul>  
          <div class="d-block d-md-none">
            <h6
              class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
              <span>User</span>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link">
                  <i class="bi bi-person-check-fill"></i>
                  Registar
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link">
                  <i class="bi bi-box-arrow-in-right"></i>
                  Login
                </router-link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    class="rounded-circle z-depth-0 avatar-img"
                    alt="avatar image"
                  />
                  <span class="avatar-text">User Name</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                  <li>
                    <router-link
                      class="dropdown-item"
                    >
                      <i class="bi bi-person-square"></i>Perfil
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                    >
                      <i class="bi bi-key-fill"></i>
                      Mudar a password
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item">
                      <i class="bi bi-arrow-right"></i>Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>

.topbar{
    color: white;
    text-align:center;
    background-color: rgb(0, 0, 0);
    height:32px;
    overflow:hidden;
    position:relative;
    width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: right;
}

.avatar-img {
  margin: -1.2rem 0.8rem -2rem 0.8rem;
  width: 3.3rem;
  height: 3.3rem;
}
.avatar-text {
  line-height: 2.2rem;
  margin: 1rem 0.5rem -2rem 0;
  padding-top: 1rem;
}

.points-text {
  line-height: 2.2rem;
  margin: 1rem 0.5rem -2rem 0;
  padding-top: 1rem;
}

.dropdown-item {
  font-size: 0.875rem;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

#sidebarMenu {
  overflow-y: auto;
}
</style>
