<template>
  <div class='app'>
    <main class='mainNav border'>
      <div class='cover-photo'>
        <h1>
          Alfred Cepeda

          <div class='image hide-downto-tablet'>
            <img class='border' :src='image' />
          </div>
        </h1>
      </div>

      <div class='nav-holder row-nw'>
        <div class='image hide-upto-tablet'>
          <img class='border' :src='image' />
        </div>

        <nav>
          <router-link to='/admin' :hidden="!isAuthenticated">Admin</router-link>
          <router-link to='/home'>Timeline</router-link>
          <router-link to='/about'>About</router-link>
          <router-link to='/blogs'>Blog<!--<span class='subtitle-font'>71</span>--></router-link>
          <!--<router-link to='/tools'>Tools</router-link>-->
          <!--<router-link to='/projects'>Projects</router-link>
          <router-link to='/more'>More <i class='material-icons'>&#xE5C5;</i></router-link>-->
        </nav>
      </div>
    </main>

    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import data from './services/data.js';

  export default {
    name: 'app',
    data: function() {
      return {
        image: '',
        name: ''
      };
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    created: function() {
      this.name = `${data.general.firstname} ${data.general.lastname}`;
      this.image = data.general.image;
    }
  };
</script>

<style lang='less' scoped>
  @import './less/variables.less';
  @import '~ajc-toolbelt/dist/less/flex.less';

  .cover-photo {
    .row-nw;
    h1 {
      font-weight:bold;
      margin:0px;
      margin-top:auto;
      margin-bottom:15px;
      margin-left:215px;
      color:@color-white;
      font-size:24px;

      .upToTablet({
        margin:20px auto 0px;
      });

      .image {
        margin-top:50px;
        margin-left:-10px;
      }
    }
  }
  .app {
    width:100%;
    max-width:1025px;
  }

  .clearfix:after {
    content: " ";
    display: block;
    clear: both;
  }

  .mainNav {
    max-width:1023px;
    width:100%;
    background:@color-white;
    margin-bottom:20px;
  }

  .image {
    padding:4px;
    border:1px solid @color-greyHr;
    border-radius:2px;
    background:@color-white;

    .upToTablet({
      top:100px;
      left:39%;
    });

    img {
      height:155px;
      width:170px;
    }
  }

  .nav-holder {
    position:relative;

    .upToTablet({
      position:static;
    });

    .image {
      position:absolute;
      top:-135px;
      left:15px;
    }

    nav {
      @nav-height:45px;
      height:@nav-height;
      border-left:1px solid #e9eaed;
      margin-left:215px;

      .upToTablet({
        margin-left:auto;
        margin-right:auto;

        &:not(:first-child) {
          border-left:unset;
        }
      });

      a {
        float:left;
        height:inherit;
        padding-left:20px;
        padding-right:20px;
        text-align:center;
        font-weight:bold;
        border-right:1px solid #e9eaed;
        line-height:@nav-height;

        .upToTablet({
          &:last-child {
            border-right:unset;
          }
        });

        &:hover {
         background:#F6F7F9;
        }
        &.router-link-active {
          color:@color-black1;
        }

        i {
          position:relative;
          top:6px;
        }
      }
    }
  }



  .cover-photo {
    height:355px;
    background-image:url('assets/images/workstation.png');
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center center;
  }

  .header {
    position:relative;
    top:-134px;
    width:100%;
  }

  .main-photo {
    margin-left:15px;
    margin-right:18px;
    margin-bottom:15px;


  }

  .content {
    align-self:flex-end;

    .info {
      width:100%;
      margin-bottom:13px;
      span {
        color:@color-white;
        font-size:1.7em;
        font-weight:500;
        line-height:30px;
      }
    }
  }
</style>
