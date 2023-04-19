---
layout: layout.njk
title: Our Team
---

<ul class="team-nav">
    <a class="anchor" href="#Faculty">Faculty</a>
    <a class="anchor" href="#phd_s">Ph.D. Students</a>
    <a class="anchor" href="#ms_s">M.S. Students</a>
    <a class="anchor" href="#alumni">Alumni</a>
    <a class="anchor" href="#colab">Collaborators</a>
</ul>

<h2 id="Faculty" style="scroll-offset">Faculty</h2>
<div>
{%for member in staff.members%}
<div class="player">
<div class="player-image float-left">
        <img src="{{ member.photo | url }}" class="img-player">
</div>
<div class="player-content">
    <div class="player-header">
    <div class="player-title h3">{{member.name}}</div>
    </div>
    <div class="player-body">
        {{member.about}}
    </div>
        <div class="player-tags">
            <p> Interests:{%for interest in member.interests%}<span class="chip">{{interest}}</span>{%endfor%}</p>
        </div>
    <div class="player-footer">
    <a href="{{member.website}}" class="btn btn-primary">Webpage</a>
    <a href="sendto:{{member.email}}" class="btn btn-link">Email</a>
    <a href="{{member.github}}" class="btn btn-link">GitHub</a>
    </div>
</div>
</div>
{%endfor%}
</div>

<h2>Students</h2>
<h3 id="phd_s" style="scroll-offset">Ph.D.</h3>
<div>
{%for member in students_phd.members%}
<div class="player">
    <div class="player-image">
        <img src="{{ member.photo | url }}" class="img-player">
    </div>
    <div class="player-content">
        <div class="player-header">
            <div class="player-title h3">{{member.name}}</div>
        </div>
        <div class="player-body">
            {{member.about}}
        </div>
        <div class="player-tags">
            <p> Interests:{%for interest in member.interests%}<span class="chip">{{interest}}</span>{%endfor%}</p>
        </div>
        <div class="player-footer">
            <a href="{{member.website}}" class="btn btn-primary">Webpage</a>
            <a href="sendto:{{member.email}}" class="btn btn-link">Email</a>
            <a href="{{member.github}}" class="btn btn-link">GitHub</a>
        </div>
    </div>
</div>
{%endfor%}
</div>

<h3 id="ms_s" style="scroll-offset">M.S</h3>
<div>
{%for member in students_ms.members%}
<div class="player">
<div class="player-image float-left">
        <img src="{{ member.photo | url }}" class="img-player">
</div>
<div class="player-content">
    <div class="player-header">
    <div class="player-title h3">{{member.name}}</div>
    </div>
    <div class="player-body">
        {{member.about}}
    </div>
    <div class="player-tags">
            <p> Interests:{%for interest in member.interests%}<span class="chip">{{interest}}</span>{%endfor%}</p>
        </div>
    <div class="player-footer">
    <a href="{{member.website}}" class="btn btn-primary">Webpage</a>
    <a href="sendto:{{member.email}}" class="btn btn-link">Email</a>
    <a href="{{member.github}}" class="btn btn-link">GitHub</a>
    </div>
</div>
</div>
{%endfor%}
</div>

<h3 id="alumni" style="scroll-offset">Alumni</h3>
<div>
{%for member in alumni.members%}
<div class="player">
<div class="player-image float-left">
        <img src="{{ member.photo | url }}" class="img-player">
</div>
<div class="player-content">
    <div class="player-header">
    <div class="player-title h3">{{member.name}}</div>
    </div>
    <div class="player-body">
        {{member.about}}
    </div>
    <div class="player-tags">
            <p> Interests:{%for interest in member.interests%}<span class="chip">{{interest}}</span>{%endfor%}</p>
    </div>
    <div class="player-footer">
    <a href="{{member.website}}" class="btn btn-primary">Webpage</a>
    <a href="sendto:{{member.email}}" class="btn btn-link">Email</a>
    <a href="{{member.github}}" class="btn btn-link">GitHub</a>
    </div>
</div>
</div>
{%endfor%}
</div>

<!-- <h3 id="colab" style="scroll-offset">Colaborators</h3>
<div>
{%for member in colab.members%}
<div class="player">
<div class="player-image float-left">
        <img src="{{ member.photo | url }}" class="img-player">
</div>
<div class="player-content">
    <div class="player-header">
    <div class="player-title h3">{{member.name}}</div>
    </div>
    <div class="player-body">
    </div>
    <div class="player-footer">
    <a href="{{member.website}}" class="btn btn-primary">Webpage</a>
    </div>
</div>
</div>
{%endfor%}
</div> -->


