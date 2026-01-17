<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer-container container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-text">chibivue.land</span>
          </div>
          <p class="footer-tagline">{{ t("footer.tagline") }}</p>
        </div>

        <div class="footer-links">
          <div class="footer-section">
            <h2 class="footer-heading">{{ t("footer.community") }}</h2>
            <ul class="footer-list">
              <li>
                <a
                  href="https://github.com/chibivue-land"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.gg/chibivue" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div class="footer-section">
            <h2 class="footer-heading">{{ t("footer.resources") }}</h2>
            <ul class="footer-list">
              <li>
                <a
                  href="https://ubugeeei.github.io/chibivue/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  chibivue Book
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} chibivue.land. {{ t("footer.rights") }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-background-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  margin-top: auto;
}

.footer-content {
  display: grid;
  gap: var(--spacing-xl);

  @media (min-width: 768px) {
    grid-template-columns: 2fr 3fr;
  }
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: var(--color-text);
}

.footer-tagline {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin-bottom: 0;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

.footer-heading {
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-list a {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.footer-list a:hover {
  color: var(--color-primary);
}

.footer-bottom {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.copyright {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  text-align: center;
  margin-bottom: 0;
}
</style>
