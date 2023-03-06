---
layout: layout.njk
title: Our Team
---
## Publications
{% assign variable = 0 %}
{%for member in pubs.records%}
{%if member.year != variable%}
{% assign variable = member.year%}
<div class="h4 flex flex-center ma1" id="{{member.year}}">---{{member.year}}---</div>
{%endif%}
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

