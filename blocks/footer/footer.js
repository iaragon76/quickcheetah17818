export default async function decorate(block) {
  block.innerHTML = `
    <div class="ac-footer-main">
      <div class="ac-footer-main-inner">
        <div class="ac-footer-card">
          <div class="ac-footer-card-inner">
            <img src="https://atlascopco.scene7.com/is/image/atlascopco/Atlas+Copco+Group+logo+header?fmt=png-alpha&wid=160" alt="Atlas Copco Group" class="ac-footer-logo">
            <p class="ac-footer-company">Atlas Copco AB</p>
            <div class="ac-footer-address">
              <p>Sickla Industriv&auml;g 19</p>
              <p>SE-105 23 Nacka/Stockholm</p>
              <p>Sweden</p>
            </div>
            <div class="ac-footer-contact-links">
              <a href="tel:+4687438000">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                +46 (0)8 743 80 00
              </a>
              <a href="mailto:info@atlascopco.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                info@atlascopco.com
              </a>
            </div>
          </div>
        </div>
        <div class="ac-footer-gold-square"></div>
        <div class="ac-footer-links-area">
          <div class="ac-footer-columns">
            <div class="ac-footer-col">
              <h5>Atlas Copco Group</h5>
              <ul>
                <li><a href="/en/about-us">About us</a></li>
                <li><a href="/en/sustainability">Sustainability</a></li>
                <li><a href="/en/careers">Careers</a></li>
                <li><a href="/en/media">Media</a></li>
                <li><a href="/en/investors">Investors</a></li>
                <li><a href="/en/innovation">Innovation</a></li>
              </ul>
            </div>
            <div class="ac-footer-col">
              <h5>Quick links</h5>
              <ul>
                <li><a href="#">How we do business</a></li>
                <li><a href="#">Brands</a></li>
                <li><a href="#">Reports and presentations</a></li>
              </ul>
            </div>
            <div class="ac-footer-about">
              <h5>About us</h5>
              <p>Atlas Copco Group develops innovative solutions across business areas including air compression, vacuum, industrial, and power techniques. With a global portfolio of 80+ brands, we enable technology that transforms the future.</p>
              <div class="ac-footer-social-row">
                <div class="ac-footer-social">
                  <a href="https://www.facebook.com/AtlasCopcoGroup/" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
                  <a href="https://www.linkedin.com/company/atlas-copco-group" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z"/></svg></a>
                  <a href="https://www.instagram.com/atlascopcogroup/" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg></a>
                  <a href="https://www.youtube.com/user/AtlasCopcoGroup" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white"/></svg></a>
                  <a href="https://twitter.com/atlascopcogroup" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                </div>
                <button class="ac-back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/><path d="m18 9-6-6-6 6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ac-footer-socket">
      <div class="ac-footer-socket-inner">
        <p>&copy; Copyright 2026 - Atlas Copco Group</p>
        <div class="ac-footer-socket-links">
          <a href="/en/privacy">Legal and Privacy Notices</a>
          <span>Manage cookies</span>
          <a href="/en/accessibility">Accessibility</a>
        </div>
      </div>
    </div>
  `;
}
