---
layout: layout.njk
title: Publications
---
## Publications

{% for section in pubs.sections %}
<div class="h4 flex flex-center ma1" id="{{ section.id }}">---{{ section.title }}---</div>
{% for pub in section.items %}
<div class="pub">
<div class="pub-title">{{ pub.title }}</div>
<div class="pub-authors gray">{{ pub.authorList }}</div>
<div class="pub-meta">
<span class="gray">{{ pub.citation }}</span>
<span class="pub-actions">
{% if pub.link != "" %}<a href="{{ pub.link }}" class="btn btn-sm btn-link">{% if pub.isPreprint %}Preprint{% else %}Paper{% endif %}</a>{% endif %}
<button type="button" class="btn btn-sm btn-link js-copy-bib" data-bibtex="{{ pub.bibtex | escape }}">.bib</button>
</span>
</div>
</div>
{% endfor %}
{% endfor %}
