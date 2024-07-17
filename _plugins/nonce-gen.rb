module Jekyll
  require 'securerandom'
  
  class NonceGenerator < Generator
    safe true

    # This generates nonce values for the Content Security Policy (CSP) and XSS hardening.
    # Nonce values are generated each time the website is built.
    def generate(site)
      site.data['nonce'] = SecureRandom.base64(16)
    end
  end
end
