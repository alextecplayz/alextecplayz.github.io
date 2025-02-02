require 'openssl'
require 'json'
require 'dotenv'

module Jekyll
  class GenerateLicenseKeys < Generator
    safe true

    def generate(site)
      # Prevent it from running if keys have already been generated.
      return if site.config['keys_generated']

      # Load environment variables from .env
      Dotenv.load

      keys = read_license_keys('.env-licensekeys')
      encrypted_keys = keys.map { |key| encrypt_key(key) }

      # Convert the encrypted keys to JSON format
      new_content = "window.validKeys = #{encrypted_keys.to_json};"

      # Check if the file exists and read its current content
      if File.exist?('js/license_keys.js')
        existing_content = File.read('js/license_keys.js')
        # Only write to the file if the content has changed
        if existing_content != new_content
          write_license_keys(new_content)
        end
      else
        # If the file doesn't exist, create it
        write_license_keys(new_content)
      end
      site.config['keys_generated'] = true
    end

    private

    def read_license_keys(file_path)
      File.readlines(file_path).map(&:chomp).reject(&:empty?)
    end

    def encrypt_key(key)
      cipher = OpenSSL::Cipher.new('aes-256-gcm')
      cipher.encrypt
      iv = cipher.random_iv
      cipher.key = generate_key
      ciphertext = cipher.update(key) + cipher.final
      auth_tag = cipher.auth_tag

      # Return a hash with ciphertext, iv, and auth_tag for each key
      { ciphertext: ciphertext.unpack1('H*'), iv: iv.unpack1('H*'), auth_tag: auth_tag.unpack1('H*') }
    end

    def generate_key
      hex_key = ENV['ENCRYPTION_KEY'] || raise("ENCRYPTION_KEY environment variable is not set")
      [hex_key].pack("H*") # Convert hex string to raw binary
    end

    def write_license_keys(content)
      File.open('js/license_keys.js', 'w') do |file|
        file.write(content)
      end
    end
  end
end