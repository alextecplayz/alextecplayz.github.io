# Inspired by https://github.com/RichDom2185/jekyll-auto-tooltips/, which seemingly doesn't
# work on my Jekyll site.

module Jekyll
  class AutoTooltips
    # Hook into the pre_render event for posts and pages
    Jekyll::Hooks.register [:posts, :pages], :pre_render do |doc|
      tooltips = doc.site.config['tooltips'] || []

      # Build a hash for quick lookup: downcased keys to descriptions
      tooltip_map = tooltips.each_with_object({}) do |t, h|
        h[t['name'].downcase] = t['desc']
      end

      # Regex to match [[ :key:Label ]]
      # Explanation:
      # \[\[\s*:(.+?):(.+?)\s*\]\]
      # Matches [[ :key:Label ]]
      tooltip_regex = /\[\[\s*:(.+?):(.+?)\s*\]\]/

      # Replace all matches in the document content
      doc.content = doc.content.gsub(tooltip_regex) do
        key = Regexp.last_match(1).strip.downcase
        label = Regexp.last_match(2).strip

        if tooltip_map.key?(key)
          entry_data = tooltip_map[key].strip.gsub('"', '&quot;') # Escape quotes for HTML attribute
          # Replace newlines with <br> tags for HTML display
          html_entry_data = entry_data.gsub(/\r?\n/, '<br>')
          
          # Construct the HTML tooltip block
          %Q{
            <span class="def-tooltip">
              <a href="#glossary-#{key}">#{label}</a>
              <span class="popup" aria-class="popup" onclick="">#{html_entry_data}</span>
            </span>
          }.strip
        else
          # No tooltip found, output original text
          Regexp.last_match(0)
        end
      end
    end
  end
end

puts "AutoTooltips plugin is loaded"