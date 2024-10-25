module Jekyll
  class ExpandTag < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @markup = markup.strip
    end

    def render(context)
      content = super(context)
      site = context.registers[:site]
      markdown_content = site.converters.find { |c| c.is_a?(Jekyll::Converters::Markdown) }.convert(content)
      expanded_content = <<~HTML
        <details class="details">
          <summary style="cursor: pointer;">Expand to show the contents of this collapsed section</summary>
          #{markdown_content}
        </details>
      HTML

      expanded_content
    end
  end
end

Liquid::Template.register_tag('expand', Jekyll::ExpandTag)