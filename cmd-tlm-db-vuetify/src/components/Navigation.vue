<template>
<!--NavBar-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            DataBase Section 
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item" to="/telemetry-packets-viewer">View Telemetry Packets</router-link></li>
            <li><router-link class="dropdown-item" to="/telemetry-points-viewer">View Telemetry Points</router-link></li>
            <li><a class="dropdown-item" href="#">View Command Packets</a></li>
            <li><a class="dropdown-item" href="#">View Command Parameters</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item-danger" to="/telemetry-packets-editor">Edit Telemetry Packets</router-link></li>
            <li><a class="dropdown-item-danger" href="#">Edit Telemetry Parameters</a></li>
            <li><a class="dropdown-item-danger" href="#">Edit Command Packets</a></li>
            <li><a class="dropdown-item-danger" href="#">Edit Command Parameters</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
     
    </div>
  </div>
</nav>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style>
</style>