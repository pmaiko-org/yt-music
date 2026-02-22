<template>
  <div class="community-page">
    <aside class="community-page__sidebar">
      <RouterLink
        :to="{ name: 'home' }"
        class="community-page__logo"
      >
        Melodies
      </RouterLink>
      <nav class="community-page__nav">
        <div class="community-page__nav-group">
          <span class="community-page__nav-label">Menu</span>
          <RouterLink
            :to="{ name: 'home' }"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><HomeIcon /></span>
            Home
          </RouterLink>
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><SearchIcon /></span>
            Browse
          </a>
          <RouterLink
            to="/community"
            class="community-page__nav-item community-page__nav-item_active"
          >
            <span class="community-page__nav-icon"><CommunityIcon /></span>
            Community
          </RouterLink>
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><DiscIcon /></span>
            Albums
          </a>
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><UserIcon /></span>
            Artists
          </a>
        </div>
        <div class="community-page__nav-group">
          <span class="community-page__nav-label">Recently Added</span>
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><ClockIcon /></span>
            Recently Added
          </a>
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><PlayIcon /></span>
            Most Played
          </a>
        </div>
        <div class="community-page__nav-group">
          <span class="community-page__nav-label">Your favorites</span>
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><HeartIcon /></span>
            Your Favorites
          </a>
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><ListIcon /></span>
            Your playlist
          </a>
          <a
            href="#"
            class="community-page__nav-item community-page__nav-item_add"
          >
            <span class="community-page__nav-icon"><PlusIcon /></span>
            + Add playlist
          </a>
        </div>
        <div class="community-page__nav-group community-page__nav-group_bottom">
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><SettingsIcon /></span>
            Setting
          </a>
          <a
            href="#"
            class="community-page__nav-item"
          >
            <span class="community-page__nav-icon"><LogoutIcon /></span>
            Logout
          </a>
        </div>
      </nav>
    </aside>

    <main class="community-page__main">
      <header class="community-page__header">
        <div class="community-page__search-wrap">
          <SearchIcon class="community-page__search-icon" />
          <input
            type="text"
            class="community-page__search"
            placeholder="Search for Musician, Artist..."
          >
        </div>
        <div class="community-page__header-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Portfolio</a>
          <button
            type="button"
            class="community-page__btn community-page__btn_primary"
          >
            Sign Up
          </button>
        </div>
      </header>

      <!-- Контент по дизайну Figma node 212-683 (Music Player — Melodies — Community) -->
      <section class="community-page__content">
        <h1 class="community-page__title">
          <strong>Community</strong>
        </h1>
        <p class="community-page__subtitle">
          Connect with other music lovers. Share playlists, discover new
          artists, and join the conversation.
        </p>

        <div class="community-page__grid">
          <article
            v-for="card in communityCards"
            :key="card.id"
            class="community-page__card"
          >
            <img
              :src="card.image"
              :alt="card.title"
              class="community-page__card-img"
            >
            <div class="community-page__card-body">
              <h3 class="community-page__card-title">
                {{ card.title }}
              </h3>
              <p class="community-page__card-meta">
                {{ card.author }} · {{ card.date }}
              </p>
              <p class="community-page__card-desc">
                {{ card.description }}
              </p>
            </div>
          </article>
        </div>
      </section>
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
  import CommunityIcon from './landing/CommunityIcon.vue'

  // Figma: Music-Player-Website-App-Melodies-Community, node-id=212-683
  const communityCards = [
    {
      id: 1,
      title: 'Best Indie Picks This Week',
      author: '@melodies_user',
      date: '2 days ago',
      description:
        'A curated list of the top indie tracks that dropped this week. Let me know your favorites!',
      image: 'https://picsum.photos/seed/c1/400/220',
    },
    {
      id: 2,
      title: 'Late Night Coding Playlist',
      author: '@dev_music',
      date: '5 days ago',
      description: 'Chill beats and lo-fi for focus. Updated every Sunday.',
      image: 'https://picsum.photos/seed/c2/400/220',
    },
    {
      id: 3,
      title: 'Throwback 2000s Hits',
      author: '@nostalgia_fan',
      date: '1 week ago',
      description: 'All the bangers from the 2000s. Feel free to suggest more.',
      image: 'https://picsum.photos/seed/c3/400/220',
    },
  ]
</script>

<style lang="scss" scoped>
/* Стили в точности как в Figma: Melodies, node 212-683 */
.community-page {
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

.community-page__sidebar {
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 220px;
  max-width: 280px;
  padding: 1.5rem 0;
  background: var(--melodies-bg);
  border-right: 1px solid var(--melodies-primary);
}

.community-page__logo {
  padding: 0 1.5rem 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--melodies-text);
  text-decoration: none;
  border-bottom: 1px solid var(--melodies-border);
}

.community-page__nav {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 0.5rem;
}

.community-page__nav-group {
  margin-bottom: 1rem;

  &.community-page__nav-group_bottom {
    padding-top: 1rem;
    margin-top: auto;
  }
}

.community-page__nav-label {
  display: block;
  padding: 0 1rem;
  margin-bottom: 0.25rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--melodies-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.community-page__nav-item {
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

  &.community-page__nav-item_active {
    color: white;
    background: var(--melodies-primary);
    border-top: 1px solid var(--melodies-primary);
    border-bottom: 1px solid var(--melodies-primary);
  }

  &.community-page__nav-item_add {
    color: var(--melodies-primary);
  }

  &:hover:not(.community-page__nav-item_active) {
    background: rgba(255, 255, 255, 0.06);
  }
}

.community-page__nav-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
}

.community-page__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden auto;
}

.community-page__header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.community-page__search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 400px;
}

.community-page__search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--melodies-muted);
  transform: translateY(-50%);
}

.community-page__search {
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

.community-page__header-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    font-size: 0.9rem;
    color: var(--melodies-text);
    text-decoration: none;
  }
}

.community-page__btn {
  padding: 0.6rem 1.25rem;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: background 0.2s;

  &_primary {
    color: white;
    background: var(--melodies-primary);

    &:hover {
      background: var(--melodies-primary-light);
    }
  }
}

.community-page__content {
  flex: 1;
  padding: 2rem;
}

.community-page__title {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--melodies-text);

  strong {
    color: var(--melodies-primary);
  }
}

.community-page__subtitle {
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--melodies-muted);
}

.community-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.community-page__card {
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--melodies-border);
  }
}

.community-page__card-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.community-page__card-body {
  padding: 1rem;
}

.community-page__card-title {
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--melodies-text);
}

.community-page__card-meta {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: var(--melodies-muted);
}

.community-page__card-desc {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--melodies-muted);
}
</style>
