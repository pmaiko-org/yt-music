<template>
  <div class="landing">
    <aside class="landing__sidebar">
      <RouterLink
        :to="{ name: 'home' }"
        class="landing__logo"
      >
        Melodies
      </RouterLink>
      <nav class="landing__nav">
        <div class="landing__nav-group">
          <span class="landing__nav-label">Menu</span>
          <RouterLink
            :to="{ name: 'home' }"
            class="landing__nav-item landing__nav-item_active"
          >
            <span class="landing__nav-icon"><HomeIcon /></span>
            Home
          </RouterLink>
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><SearchIcon /></span>
            Browse
          </a>
          <RouterLink
            :to="{ name: 'community' }"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><CommunityIcon /></span>
            Community
          </RouterLink>
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><DiscIcon /></span>
            Albums
          </a>
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><UserIcon /></span>
            Artists
          </a>
        </div>
        <div class="landing__nav-group">
          <span class="landing__nav-label">Recently Added</span>
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><ClockIcon /></span>
            Recently Added
          </a>
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><PlayIcon /></span>
            Most Played
          </a>
        </div>
        <div class="landing__nav-group">
          <span class="landing__nav-label">Your favorites</span>
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><HeartIcon /></span>
            Your Favorites
          </a>
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><ListIcon /></span>
            Your playlist
          </a>
          <a
            href="#"
            class="landing__nav-item landing__nav-item_add"
          >
            <span class="landing__nav-icon"><PlusIcon /></span>
            + Add playlist
          </a>
        </div>
        <div class="landing__nav-group landing__nav-group_bottom">
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><SettingsIcon /></span>
            Setting
          </a>
          <a
            href="#"
            class="landing__nav-item"
          >
            <span class="landing__nav-icon"><LogoutIcon /></span>
            Logout
          </a>
        </div>
      </nav>
    </aside>

    <main class="landing__main">
      <header class="landing__header">
        <div class="landing__search-wrap">
          <SearchIcon class="landing__search-icon" />
          <input
            type="text"
            class="landing__search"
            placeholder="Search for Musician, Artist..."
          >
        </div>
        <div class="landing__header-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Portfolio</a>
          <button
            type="button"
            class="landing__btn landing__btn_primary"
          >
            Sign Up
          </button>
        </div>
      </header>

      <section class="landing__hero">
        <div class="landing__hero-content">
          <h1 class="landing__hero-title">
            All the <strong>Best Songs</strong> in One Place
          </h1>
          <p class="landing__hero-desc">
            Find your favorite songs and create playlists. Stream and download
            music from our library. Join thousands of members and discover new
            artists every day.
          </p>
          <div class="landing__hero-actions">
            <button
              type="button"
              class="landing__btn landing__btn_primary"
            >
              Browse Now
            </button>
            <button
              type="button"
              class="landing__btn landing__btn_outline"
            >
              Create Playlist
            </button>
          </div>
        </div>
        <div class="landing__hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80"
            alt="Music"
            class="landing__hero-image"
          >
        </div>
      </section>

      <section class="landing__section">
        <h2 class="landing__section-title">
          Weekly Top <strong>Songs</strong>
        </h2>
        <div class="landing__cards">
          <a
            v-for="item in weeklyTop"
            :key="item.id"
            href="#"
            class="landing__card"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="landing__card-img"
            >
            <span class="landing__card-title">{{ item.title }}</span>
            <span class="landing__card-meta">{{ item.artist }}</span>
          </a>
          <a
            href="#"
            class="landing__card landing__card_view-all"
          >
            <span class="landing__card-view-icon"><PlusIcon /></span>
            <span>View All</span>
          </a>
        </div>
      </section>

      <section class="landing__section">
        <h2 class="landing__section-title">
          New Release <strong>Songs</strong>
        </h2>
        <div class="landing__cards">
          <a
            v-for="item in newRelease"
            :key="item.id"
            href="#"
            class="landing__card"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="landing__card-img"
            >
            <span class="landing__card-title">{{ item.title }}</span>
            <span class="landing__card-meta">{{ item.artist }}</span>
          </a>
          <a
            href="#"
            class="landing__card landing__card_view-all"
          >
            <span class="landing__card-view-icon"><PlusIcon /></span>
            <span>View All</span>
          </a>
        </div>
      </section>

      <section class="landing__section">
        <h2 class="landing__section-title">Trending <strong>Songs</strong></h2>
        <div class="landing__table-wrap">
          <table class="landing__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Date</th>
                <th>Album</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in trending"
                :key="row.id"
              >
                <td>
                  <span class="landing__table-num">#{{ i + 1 }}</span>
                  <img
                    :src="row.image"
                    :alt="row.title"
                    class="landing__table-img"
                  >
                  <div>
                    <span class="landing__table-title">{{ row.title }}</span>
                    <span class="landing__table-artist">{{ row.artist }}</span>
                  </div>
                </td>
                <td>{{ row.releaseDate }}</td>
                <td>{{ row.album }}</td>
                <td>
                  {{ row.time }}
                  <HeartIcon class="landing__table-heart" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <a
          href="#"
          class="landing__view-all-link"
        >+ View All</a>
      </section>

      <section class="landing__section">
        <h2 class="landing__section-title">Popular <strong>Artists</strong></h2>
        <div class="landing__artists">
          <a
            v-for="artist in popularArtists"
            :key="artist.id"
            href="#"
            class="landing__artist"
          >
            <img
              :src="artist.image"
              :alt="artist.name"
              class="landing__artist-img"
            >
            <span class="landing__artist-name">{{ artist.name }}</span>
          </a>
          <a
            href="#"
            class="landing__artist landing__artist_view-all"
          >
            <span class="landing__card-view-icon"><PlusIcon /></span>
            <span>View All</span>
          </a>
        </div>
      </section>

      <section class="landing__section">
        <h2 class="landing__section-title">Music <strong>Video</strong></h2>
        <div class="landing__videos">
          <a
            v-for="v in musicVideos"
            :key="v.id"
            href="#"
            class="landing__video"
          >
            <img
              :src="v.image"
              :alt="v.title"
              class="landing__video-img"
            >
            <span class="landing__video-title">{{ v.title }}</span>
            <span class="landing__video-meta">{{ v.artist }} · {{ v.views }}</span>
          </a>
          <a
            href="#"
            class="landing__video landing__card_view-all"
          >
            <span class="landing__card-view-icon"><PlusIcon /></span>
            <span>View All</span>
          </a>
        </div>
      </section>

      <section class="landing__section">
        <h2 class="landing__section-title">Top <strong>Albums</strong></h2>
        <div class="landing__cards">
          <a
            v-for="item in topAlbums"
            :key="item.id"
            href="#"
            class="landing__card"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="landing__card-img"
            >
            <span class="landing__card-title">{{ item.title }}</span>
            <span class="landing__card-meta">{{ item.artist }}</span>
          </a>
          <a
            href="#"
            class="landing__card landing__card_view-all"
          >
            <span class="landing__card-view-icon"><PlusIcon /></span>
            <span>View All</span>
          </a>
        </div>
      </section>

      <section class="landing__section">
        <h2 class="landing__section-title">Mood <strong>Playlist</strong></h2>
        <div class="landing__moods">
          <a
            v-for="m in moodPlaylists"
            :key="m.id"
            href="#"
            class="landing__mood"
            :style="{ backgroundImage: `url(${m.image})` }"
          >
            <span class="landing__mood-title">{{ m.title }}</span>
          </a>
          <a
            href="#"
            class="landing__mood landing__card_view-all"
          >
            <span class="landing__card-view-icon"><PlusIcon /></span>
            <span>View All</span>
          </a>
        </div>
      </section>

      <section class="landing__join">
        <div class="landing__join-content">
          <h2 class="landing__join-title">Join Our Platform</h2>
          <p class="landing__join-desc">
            Become one of our <strong>members</strong> today. Create an account
            or <strong>Login</strong> to start listening and building your
            playlists.
          </p>
        </div>
        <div class="landing__join-form-wrap">
          <div class="landing__form-tabs">
            <button
              type="button"
              class="landing__form-tab landing__form-tab_active"
            >
              Sign Up
            </button>
            <button
              type="button"
              class="landing__form-tab"
            >
              Login
            </button>
          </div>
          <form
            class="landing__form"
            @submit.prevent
          >
            <input
              type="text"
              placeholder="Enter You Name Here"
              class="landing__input"
            >
            <input
              type="tel"
              placeholder="Enter You Number"
              class="landing__input"
            >
            <input
              type="email"
              placeholder="Enter You Email Here"
              class="landing__input"
            >
            <button
              type="submit"
              class="landing__btn landing__btn_primary landing__btn_block"
            >
              Sign Up
            </button>
          </form>
          <p class="landing__form-or">Or</p>
          <button
            type="button"
            class="landing__btn landing__btn_google"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt=""
              width="20"
              height="20"
            >
            Sign up with Google
          </button>
        </div>
      </section>

      <footer class="landing__footer">
        <div class="landing__footer-about">
          <h3 class="landing__footer-heading">About</h3>
          <p class="landing__footer-text">
            Melodies is your destination for streaming and downloading music.
            Discover new artists and enjoy a premium listening experience.
          </p>
        </div>
        <div class="landing__footer-links">
          <div class="landing__footer-col">
            <h3 class="landing__footer-heading">Melodies</h3>
            <a href="#">Songs</a>
            <a href="#">Radio</a>
            <a href="#">Podcast</a>
          </div>
          <div class="landing__footer-col">
            <h3 class="landing__footer-heading">Access</h3>
            <a href="#">Explore</a>
            <a href="#">Artists</a>
            <a href="#">Playlists</a>
            <a href="#">Albums</a>
            <a href="#">Trending</a>
          </div>
          <div class="landing__footer-col">
            <h3 class="landing__footer-heading">Contact</h3>
            <a href="#">About</a>
            <a href="#">Policy</a>
            <a href="#">Social Media</a>
            <a href="#">Support</a>
          </div>
        </div>
        <div class="landing__footer-brand">
          <div class="landing__logo">Melodies</div>
          <div class="landing__footer-social">
            <a
              href="#"
              aria-label="Instagram"
            ><SocialIcon name="instagram" /></a>
            <a
              href="#"
              aria-label="Twitter"
            ><SocialIcon name="twitter" /></a>
            <a
              href="#"
              aria-label="Facebook"
            ><SocialIcon name="facebook" /></a>
            <a
              href="#"
              aria-label="Pinterest"
            ><SocialIcon name="pinterest" /></a>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
  import HomeIcon from './landing/HomeIcon.vue'
  import SearchIcon from './landing/SearchIcon.vue'
  import DiscIcon from './landing/DiscIcon.vue'
  import UserIcon from './landing/UserIcon.vue'
  import ClockIcon from './landing/ClockIcon.vue'
  import PlayIcon from './landing/PlayIcon.vue'
  import HeartIcon from './landing/HeartIcon.vue'
  import ListIcon from './landing/ListIcon.vue'
  import PlusIcon from './landing/PlusIcon.vue'
  import SettingsIcon from './landing/SettingsIcon.vue'
  import LogoutIcon from './landing/LogoutIcon.vue'
  import SocialIcon from './landing/SocialIcon.vue'
  import CommunityIcon from './landing/CommunityIcon.vue'

  // Figma design: Melodies Music Player - colors Normal #EE10B0, Darker #53063E, bg #1a1a1a, font Vazirmatn
  const weeklyTop = [
    {
      id: 1,
      title: 'Whatever It Takes',
      artist: 'Imagine Dragons',
      image: 'https://picsum.photos/seed/w1/200/200',
    },
    {
      id: 2,
      title: 'Skyfall',
      artist: 'Adele',
      image: 'https://picsum.photos/seed/w2/200/200',
    },
    {
      id: 3,
      title: 'Superfan',
      artist: 'Eminem',
      image: 'https://picsum.photos/seed/w3/200/200',
    },
    {
      id: 4,
      title: 'Softcore',
      artist: 'The Neighbourhood',
      image: 'https://picsum.photos/seed/w4/200/200',
    },
    {
      id: 5,
      title: 'The Loneliest',
      artist: 'Måneskin',
      image: 'https://picsum.photos/seed/w5/200/200',
    },
  ]
  const newRelease = [
    {
      id: 1,
      title: 'Time',
      artist: 'Anuel AA',
      image: 'https://picsum.photos/seed/n1/200/200',
    },
    {
      id: 2,
      title: '112',
      artist: 'Dua Lipa',
      image: 'https://picsum.photos/seed/n2/200/200',
    },
    {
      id: 3,
      title: 'We Don\'t Care',
      artist: 'Alan Walker & Dua',
      image: 'https://picsum.photos/seed/n3/200/200',
    },
    {
      id: 4,
      title: 'Who I Am',
      artist: 'Alan Walker & Zara',
      image: 'https://picsum.photos/seed/n4/200/200',
    },
    {
      id: 5,
      title: 'Bones',
      artist: 'Imagine Dragons',
      image: 'https://picsum.photos/seed/n5/200/200',
    },
  ]
  const trending = [
    {
      id: 1,
      title: 'Song One',
      artist: 'Artist A',
      album: 'Album A',
      releaseDate: '2024-01-15',
      time: '3:24',
      image: 'https://picsum.photos/seed/t1/80/80',
    },
    {
      id: 2,
      title: 'Song Two',
      artist: 'Artist B',
      album: 'Album B',
      releaseDate: '2024-01-14',
      time: '2:45',
      image: 'https://picsum.photos/seed/t2/80/80',
    },
    {
      id: 3,
      title: 'Song Three',
      artist: 'Artist C',
      album: 'Album C',
      releaseDate: '2024-01-13',
      time: '4:12',
      image: 'https://picsum.photos/seed/t3/80/80',
    },
    {
      id: 4,
      title: 'Song Four',
      artist: 'Artist D',
      album: 'Album D',
      releaseDate: '2024-01-12',
      time: '3:00',
      image: 'https://picsum.photos/seed/t4/80/80',
    },
    {
      id: 5,
      title: 'Song Five',
      artist: 'Artist E',
      album: 'Album E',
      releaseDate: '2024-01-11',
      time: '3:45',
      image: 'https://picsum.photos/seed/t5/80/80',
    },
    {
      id: 6,
      title: 'Song Six',
      artist: 'Artist F',
      album: 'Album F',
      releaseDate: '2024-01-10',
      time: '2:30',
      image: 'https://picsum.photos/seed/t6/80/80',
    },
    {
      id: 7,
      title: 'Song Seven',
      artist: 'Artist G',
      album: 'Album G',
      releaseDate: '2024-01-09',
      time: '4:00',
      image: 'https://picsum.photos/seed/t7/80/80',
    },
  ]
  const popularArtists = [
    {
      id: 1,
      name: 'Billie Eilish',
      image: 'https://picsum.photos/seed/a1/160/160',
    },
    { id: 2, name: 'The Weeknd', image: 'https://picsum.photos/seed/a2/160/160' },
    { id: 3, name: 'Adele', image: 'https://picsum.photos/seed/a3/160/160' },
    {
      id: 4,
      name: 'Lana Del Rey',
      image: 'https://picsum.photos/seed/a4/160/160',
    },
    {
      id: 5,
      name: 'Harry Styles',
      image: 'https://picsum.photos/seed/a5/160/160',
    },
    {
      id: 6,
      name: 'Billie Eilish',
      image: 'https://picsum.photos/seed/a6/160/160',
    },
  ]
  const musicVideos = [
    {
      id: 1,
      title: 'Gossip',
      artist: 'Måneskin',
      views: '34k views',
      image: 'https://picsum.photos/seed/v1/320/180',
    },
    {
      id: 2,
      title: 'Shape Of You',
      artist: 'Ed Sheeran',
      views: '1.2M views',
      image: 'https://picsum.photos/seed/v2/320/180',
    },
    {
      id: 3,
      title: 'Someone Like You',
      artist: 'Adele',
      views: '890k views',
      image: 'https://picsum.photos/seed/v3/320/180',
    },
  ]
  const topAlbums = [
    {
      id: 1,
      title: 'Adele 21',
      artist: 'Adele',
      image: 'https://picsum.photos/seed/al1/200/200',
    },
    {
      id: 2,
      title: 'Scorpion',
      artist: 'Drake',
      image: 'https://picsum.photos/seed/al2/200/200',
    },
    {
      id: 3,
      title: 'Harry\'s House',
      artist: 'Harry Styles',
      image: 'https://picsum.photos/seed/al3/200/200',
    },
    {
      id: 4,
      title: 'Born To Die',
      artist: 'Lana Del Rey',
      image: 'https://picsum.photos/seed/al4/200/200',
    },
    {
      id: 5,
      title: 'Beauty Behind The Madness',
      artist: 'The Weeknd',
      image: 'https://picsum.photos/seed/al5/200/200',
    },
  ]
  const moodPlaylists = [
    {
      id: 1,
      title: 'Sad Playlist',
      image:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=280&q=80',
    },
    {
      id: 2,
      title: 'Chill Playlist',
      image:
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=280&q=80',
    },
    {
      id: 3,
      title: 'Workout Playlist',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=280&q=80',
    },
    {
      id: 4,
      title: 'Love Playlist',
      image:
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=280&q=80',
    },
    {
      id: 5,
      title: 'Happy Playlist',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=280&q=80',
    },
  ]
</script>

<style lang="scss" scoped>
.landing {
  --melodies-bg: #1a1a1a;
  --melodies-primary: #ee10b0;
  --melodies-primary-light: #fab5e7;
  --melodies-darker: #53063e;
  --melodies-text: #fff;
  --melodies-muted: #b0b0b0;
  --melodies-border: rgba(238, 16, 176, 0.3);

  display: flex;
  min-height: 100vh;
  font-family: Vazirmatn, sans-serif;
  color: var(--melodies-text);
  background: var(--melodies-bg);
}

.landing__sidebar {
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 220px;
  max-width: 280px;
  padding: 1.5rem 0;
  background: var(--melodies-bg);
  border-right: 1px solid var(--melodies-primary);
}

.landing__logo {
  padding: 0 1.5rem 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--melodies-text);
  text-decoration: none;
  border-bottom: 1px solid var(--melodies-border);
}

.landing__nav {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 0.5rem;
}

.landing__nav-group {
  margin-bottom: 1rem;

  &.landing__nav-group_bottom {
    padding-top: 1rem;
    margin-top: auto;
  }
}

.landing__nav-label {
  display: block;
  padding: 0 1rem;
  margin-bottom: 0.25rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--melodies-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.landing__nav-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.6rem 1rem;
  margin: 0 0.25rem;
  font-size: 0.9rem;
  color: var(--melodies-text);
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;

  &.landing__nav-item_active {
    color: white;
    background: var(--melodies-primary);
    border-top: 1px solid var(--melodies-primary);
    border-bottom: 1px solid var(--melodies-primary);
  }

  &.landing__nav-item_add {
    color: var(--melodies-primary);
  }

  &:hover:not(.landing__nav-item_active) {
    background: rgba(255, 255, 255, 0.06);
  }
}

.landing__nav-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
}

.landing__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden auto;
}

.landing__header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.landing__search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 400px;
}

.landing__search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--melodies-muted);
  transform: translateY(-50%);
}

.landing__search {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--melodies-text);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;

  &::placeholder {
    color: var(--melodies-muted);
  }
}

.landing__header-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    font-size: 0.9rem;
    color: var(--melodies-text);
    text-decoration: none;
  }
}

.landing__btn {
  padding: 0.6rem 1.25rem;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition:
    background 0.2s,
    border-color 0.2s;

  &_primary {
    color: white;
    background: var(--melodies-primary);

    &:hover {
      background: var(--melodies-primary-light);
    }
  }

  &_outline {
    color: var(--melodies-text);
    background: transparent;
    border: 1px solid var(--melodies-muted);

    &:hover {
      border-color: var(--melodies-text);
    }
  }

  &_block {
    width: 100%;
    padding: 0.75rem;
  }

  &_google {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.75rem;
    font-family: inherit;
    color: var(--melodies-text);
    cursor: pointer;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--melodies-muted);
    border-radius: 8px;
  }
}

.landing__hero {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 3rem;
}

.landing__hero-content {
  flex: 1;
  min-width: 280px;
  max-width: 520px;
}

.landing__hero-title {
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--melodies-text);

  strong {
    color: var(--melodies-primary);
  }
}

.landing__hero-desc {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--melodies-muted);
}

.landing__hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.landing__hero-image-wrap {
  flex: 0 0 auto;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 40px rgba(238, 16, 176, 0.25);
}

.landing__hero-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.landing__section {
  padding: 0 2rem 2.5rem;
}

.landing__section-title {
  margin-bottom: 1.25rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--melodies-text);

  strong {
    color: var(--melodies-primary);
  }
}

.landing__cards {
  display: flex;
  gap: 1.25rem;
  padding-bottom: 0.5rem;
  overflow-x: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--melodies-primary);
    border-radius: 3px;
  }
}

.landing__card {
  display: flex;
  flex: 0 0 160px;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &_view-all {
    flex: 0 0 100px;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 0.85rem;
    color: var(--melodies-muted);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }
}

.landing__card-img {
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 0.5rem;
  object-fit: cover;
  border-radius: 10px;
}

.landing__card-title {
  overflow: hidden;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--melodies-text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.landing__card-meta {
  font-size: 0.8rem;
  color: var(--melodies-muted);
}

.landing__card-view-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: var(--melodies-primary);
  background: rgba(238, 16, 176, 0.2);
  border-radius: 50%;
}

.landing__table-wrap {
  margin-bottom: 0.75rem;
  overflow-x: auto;
}

.landing__table {
  width: 100%;
  font-size: 0.9rem;
  border-collapse: collapse;

  th {
    padding: 0.6rem 1rem;
    font-weight: 500;
    color: var(--melodies-muted);
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  td {
    padding: 0.6rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  tr:hover td {
    background: rgba(255, 255, 255, 0.03);
  }
}

.landing__table-num {
  margin-right: 0.5rem;
  font-size: 0.85rem;
  color: var(--melodies-muted);
}

.landing__table td:first-child {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.landing__table-img {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
}

.landing__table-title {
  display: block;
  font-weight: 500;
  color: var(--melodies-text);
}

.landing__table-artist {
  font-size: 0.8rem;
  color: var(--melodies-muted);
}

.landing__table-heart {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  color: var(--melodies-primary);
  vertical-align: middle;
}

.landing__view-all-link {
  font-size: 0.9rem;
  color: var(--melodies-muted);
  text-decoration: none;

  &:hover {
    color: var(--melodies-primary);
  }
}

.landing__artists {
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
  padding-bottom: 0.5rem;
  overflow-x: auto;
}

.landing__artist {
  display: flex;
  flex: 0 0 100px;
  flex-direction: column;
  align-items: center;
  color: inherit;
  text-decoration: none;

  &:hover .landing__artist-name {
    color: var(--melodies-primary);
  }

  &_view-all {
    gap: 0.5rem;
    justify-content: center;
    font-size: 0.85rem;
    color: var(--melodies-muted);
  }
}

.landing__artist-img {
  width: 100px;
  height: 100px;
  margin-bottom: 0.5rem;
  object-fit: cover;
  border-radius: 50%;
}

.landing__artist-name {
  font-size: 0.85rem;
  color: var(--melodies-text);
  text-align: center;
}

.landing__videos {
  display: flex;
  gap: 1.25rem;
  padding-bottom: 0.5rem;
  overflow-x: auto;
}

.landing__video {
  display: flex;
  flex: 0 0 280px;
  flex-direction: column;
  color: inherit;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }

  &.landing__card_view-all {
    flex: 0 0 120px;
    min-height: 140px;
  }
}

.landing__video-img {
  width: 100%;
  aspect-ratio: 16/9;
  margin-bottom: 0.5rem;
  object-fit: cover;
  border-radius: 10px;
}

.landing__video-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--melodies-text);
}

.landing__video-meta {
  font-size: 0.8rem;
  color: var(--melodies-muted);
}

.landing__moods {
  display: flex;
  gap: 1rem;
  padding-bottom: 0.5rem;
  overflow-x: auto;
}

.landing__mood {
  display: flex;
  flex: 0 0 180px;
  align-items: flex-end;
  height: 120px;
  padding: 1rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  background-position: center;
  background-size: cover;
  border-radius: 12px;

  &.landing__card_view-all {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    color: var(--melodies-muted);
    background: rgba(255, 255, 255, 0.08);
  }
}

.landing__mood-title {
  font-size: 0.95rem;
}

.landing__join {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  margin: 0 2rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
}

.landing__join-content {
  flex: 1;
  min-width: 260px;
}

.landing__join-title {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--melodies-text);
}

.landing__join-desc {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--melodies-muted);

  strong {
    color: var(--melodies-primary);
  }
}

.landing__join-form-wrap {
  flex: 0 0 320px;
  padding: 1.25rem;
  background: var(--melodies-bg);
  border: 1px solid var(--melodies-primary);
  border-radius: 12px;
}

.landing__form-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.landing__form-tab {
  flex: 1;
  padding: 0.6rem;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--melodies-text);
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: 8px;

  &_active {
    color: white;
    background: var(--melodies-primary);
  }
}

.landing__form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.landing__input {
  padding: 0.75rem 1rem;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--melodies-text);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;

  &::placeholder {
    color: var(--melodies-muted);
  }
}

.landing__form-or {
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: var(--melodies-muted);
  text-align: center;
}

.landing__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.landing__footer-about {
  flex: 1;
  min-width: 200px;
  max-width: 280px;
}

.landing__footer-heading {
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--melodies-text);
}

.landing__footer-text {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--melodies-muted);
}

.landing__footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.landing__footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    font-size: 0.9rem;
    color: var(--melodies-muted);
    text-decoration: none;

    &:hover {
      color: var(--melodies-primary);
    }
  }
}

.landing__footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.landing__footer-social {
  display: flex;
  gap: 0.75rem;

  a {
    color: var(--melodies-muted);

    &:hover {
      color: var(--melodies-primary);
    }
  }
}
</style>
