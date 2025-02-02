require 'openssl'
require 'json'
require 'dotenv'

module Jekyll
  class EncryptArticles < Generator
    safe true

    def generate(site)
      # Load environment variables from .env
      Dotenv.load

      site.posts.docs.each do |post|
        if post.data['paidcontent']
          # Render the post content to HTML first
          html_content = render_post_to_html(post)
          # Encrypt the rendered HTML content
          encrypted_content = encrypt_content(html_content)
          # Replace the post content with encrypted content
          post.content = encrypted_content
        end
      end
    end

    private

    # Renders the Markdown content of a post to HTML using Jekyll's rendering process
    def render_post_to_html(post)
      info = {
        registers: { site: post.site, page: post },
        strict_filters: post.site.config["liquid"]["strict_filters"]
      }
      payload = post.site.site_payload.merge({ "page" => post.to_liquid })
      Liquid::Template.parse(post.content).render!(payload, info)
    end

    def encrypt_content(plaintext)
      cipher = OpenSSL::Cipher.new('aes-256-gcm')
      cipher.encrypt
      iv = cipher.random_iv
      cipher.key = generate_key
      ciphertext = cipher.update(plaintext) + cipher.final
      auth_tag = cipher.auth_tag

      # Return a JSON object with ciphertext, iv, and auth_tag
      { ciphertext: ciphertext.unpack1('H*'), iv: iv.unpack1('H*'), auth_tag: auth_tag.unpack1('H*') }.to_json
    end

    def generate_key
      hex_key = ENV['ENCRYPTION_KEY'] || raise("ENCRYPTION_KEY environment variable is not set")
      [hex_key].pack("H*") # Convert hex string to raw binary
    end
  end
end