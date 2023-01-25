---
layout: layout.njk
title: Our Team
---
## Publications
{%for member in pubs.records%}
<div class="card">
<div class="card-content">
<div class="card-header">
<div class="card-title h5">{{member.title}}</div>
</div>
<div class="card-body">
<p class="gray">
{%for author in member.author%}{{author.name}}; {%endfor%}
</p>
{% if member.booktitle == null or member.booktitle == "" %}
<p class="gray">{{member.journal.name}}, {{member.journal.volume}}, {{member.journal.number}}, {{member.journal.pages}}, {{member.year}}</p>
{% else %}
<p class="gray">{{member.booktitle}}, {{member.year}}</p>
{% endif %}
</div>
<div class="card-footer">
<a href="{{member.link}}" class="btn btn-primary">Paper</a>
</div>
</div>
</div>
{%endfor%}

