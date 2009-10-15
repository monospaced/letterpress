# Front End Guidelines

## Overview

What does it cover?

*   Suggestions for front-end build standards and methods
*   Recommendations for any front-end issues outside the scope of templating

## Contents

*   Standards and techniques for site builds
*   Server configuration recommendations

## TO DO 

*   Justifications for critical points
*   Link out to sources where appropriate
*   Notes on maintaining copyright info and checking suitability/licensing of "found" code

## Standards and techniques for site builds

This section outlines standards and techniques related to templating. 

Need some high-level guidelines here.

*   The website should be compatible with a wide range of browsers (GBS)
*   Page weight should be kept to a minimum
*   All styling should be controlled using CSS
*   HTML should be semantically structured
*   Forms should be accessible and built using semantic markup
*   Tables should only be used for the rendering of tabular data

### Browser compatibility

Recommend using Yahoo GBS here.

## Page Weight

Speed is generally more important than page-weight and is more a factor of front-end engineering than asset size. Focus on optimization instead, including: 

*   Removing unnecessary assets from production sites
*   Gziping textual assets
*   Keeping HTML, CSS and Javascript as light as possible
*   Refactoring CSS when structural changes are made

More on this in the Performance section.

### Doctype, character set and content type.

XHTML 1.0 Strict or HTML 4.01 Strict are recommended wherever possible; letterpress uses XHTML 1.0 Strict. Under some circumstances it may be worth experimenting with HTML5.

Using a Transitional doctype can introduce some IE-specific rendering issues. (source?)

Use UTF-8 character set to ensure that foreign-language characters are rendered correctly.

All HTML should be served as text/html to ensure that all browsers render the page in Standards mode (not on why serving as xml/xhtml isn't really an option?)

### Colour profiles

Before starting any development work, following the instructions in the post below to avoid colour-mismatch issues.

http://www.viget.com/inspire/the-mysterious-save-for-web-color-shift/

### General

Make sure spelling is accurate (particularly when specifying class and id attributes).

### Frames and iframes

Frames and iframes should be avoided wherever possible and only used when absolutely necessary.

However, it should be recognised that iframes are required for certain techniques, notably:

*   Carrying hidden data, e.g. DoubleClick ad tags
*   Cross-Domain Communication
*   [Comet][1] (under certain circumstances)
*   Certain display techniques (e.g. Lightbox)

Care must be taken to ensure that the use of iframes under any circumstances does not adversely affect accessibility.

### Accessibility

Conform to [WCAG 2.0][2] and local disability laws/guidelines as appropriate, unless the client has a particular requirement for WCAG 1.0. WCAG 2.0 has now [reached Final Recommendation status][3].

While working to recognised standards (e.g. WCAG 1.0, WCAG 2.0) makes good sense, it should be recognised that accessibility is often a case of pragmatism over strict compliance. For example, providing alt text for all images regardless of context can lead to duplicate content and a reduced experience.

#### Skip navigation

All pages should feature "skip" navigation to aid users with screenreaders in particular. "Skip" navigation should be the first element on every page and should feature the following items (where appropriate):

*   Skip to main content
*   Search
*   Site map
*   Homepage

While visible skip links (or skip links that become visible on focus) can be useful for people with motor disabilities or repetitive strain injuries, we recommend that in most cases they are hidden off-page unless the designs explicitly account for this option.

#### Hidden contextual items

Hidden headings can help add structure to a page. These should fit within the normal heading hierarchy and be hidden using the class "context".

Other types of hidden content?

*   Form labels - expand on this.

#### Tabindex

Having a poorly-implemented tabindex is often worse than having no tabindex at all. Relying on a well-structured document is often enough.

#### Accesskeys

Complicated accesskey sets can be difficult to use and maintain. Having poorly-implemented accesskeys is often worse than having no accesskeys at all.

Our recommendation is that if accesskeys are implemented, they should be used sparingly and thoughtfully, for example attaching accesskeys to the links in "skip navigation".

#### Contrast

Notes on contrast here. This should come from WCAG 2.0.

### Project structure

This needs revision. Should it even be part of this?

*   web/_static-templates - all HTML templates. This should be published to development/staging environments for testing but not published to any public-facing environment.
*   web/_format- all formatting assets (images, icons, swfs), in appropriate subfolder
*   web/_function - all functional assets (JavaScript)
*   web/_media - all assets that are not part of core site furniture (e.g. sample product imagery)
*   build-assets/- all build files incl. FLA, PSD etc

### File-naming conventions

All file names (HTML, CSS, JavaScript, images) should be lower case, to prevent confusion.

Spaces in filenames should be avoided. Instead, an underscore ("_") should be used in place of a space in included files (images/JavaScript/CSS) and a hyphen ("-") should be used in place of a space in HTML files URL paths. 

This needs work - dashes to expand on identifiers eg. nav\_red-arrow\_left

Images named for page/area, so global\_, home\_, etc? TBD

### Site structure

There should always be a sitemap (for accessibility).

Terms and conditions should be present (if relevant).

The Companies Act 2007 (UK) requires that all websites should now legibly display the following details somewhere on the site:

*   Full company name
*   Company's place of registration and the number with which it is registered
*   Address of the company's registered office

### Typography

CSS default font size is [62.5%][4]. Everything after that should be sized in "em". Line heights should be [unitless][5] where possible.

For image replacement, [Gilder/Levin][6] without Shea Enhancement is recommended. When the replacement image has to be transparent (and therefore cannot hide the text below), there is no ideal solution for a 'CSS-on, Images-off' situation, as the text must be hidden from view.

Info on font stacks here.

The decision of whether to use [sIFR][7] on a project must be made in full knowledge of it's restrictions and the issues it causes. Some of the main issues include:

*   There's a CPU hit when initially rendering a page with lots of sIFR
*   Poor support for leading, kerning, line-heights (making it very difficult to acheive cross-browser pixel perfection)
*   Page layouts tend to 'jump' a lot when sIFR is first initialised on page load
*   sIFR text doesn't resize all that well when the browser text size is changed
*   sIFR use should be limited to headings, not main page text
*   It is not possible to select sIFR text and normal HTML text at the same time in one smooth selection motion
*   the actionscript (at least for sIFR 1 & 2) was not optimised and so full of memory leaks making it CPU intensive.

We could do with some similar notes for cufon and @font-face.

### Javascript

#### General

*   To ensure content is accessible to all, a website must remain functional if the user does not have JavaScript enabled. A user with an older, non-visual or text-based Internet browser may not receive the same experience, but must still see replacement content that portrays the key relevant information. Use the principles of Progressive Enhancement and Graceful Degradation to enrich the page.
*   Don't use javascript: calls in links.
*   Ideally, all JavaScript should remain unobtrusive, keeping all functionality in external files to enable re-use across the site. All event calls should be attached via the DOM rather than inserted inline.
*   There will be times when inline JavaScript is necessary. Exceptions include tracking code, embedding flash files via SWF Object, and passing JavaScript content from a backend system when the use of AJAX is unavailable.
*   Client-side form validation can be used, but must not be relied upon, as the presence of JavaScript cannot be assured. All forms must also be validated on the server side.
*   CSS styles should not be set directly through JavaScript. Instead, an additional value should be set on the body tag via JavaScript on DOM load, to enable CSS styles for JavaScript-enhanced pages. This enables the CSS development of these pages to be carried out before the JavaScript is implemented.
*   If you are using JavaScript to set listeners for mouse events, ensure that you are also creating events to cater for the interaction of users who use non-pointing devices. This makes pages usable for keyboard users and alternative devices.
*   JSLint should be used to ensure there are no errors in JavaScript code. This is a necessary step before any code can be minified, and helps to ensures all code is well formed.

#### Coding Specifics

*   Avoid using global variables and functions. They pollute the global namespace and increase the potential for code conflicts, especially when having to work with third party JavaScript files, or pass on code to others to implement. There are valid alternatives to using the global scope: either namespace your code, or use object literal, the Module Pattern or self executing function notation.
*   As a preferred method, attempt to use the Yahoo! Module Pattern. This well-documented technique allows code to be structured in a standard defined manner, and ensures a separation between public and private variables and methods. It also makes it possible to alter classes quickly from a singleton pattern to using a constructor with only a few small changes.
*   Deciding upon the most appropriate JavaScript library/framework for the project will depend upon the required functionality for the site. Use jQuery for sites that only require a small amount of JavaScript functionality, as it can be the quickest to implement. If there is a reasonable level of complexity then it is recommended to switch to YUI, as it offers a high level of functionality, support and documentation.
*   Where appropriate, all JavaScript functions should be initialised through an init() method. This standard approach helps to increase consistency throughout the site.
*   Don't assume the structure of the HTML - instead of hardcoding specific IDs to search for in JavaScript, allow them to be passed through to the function via the init call.

#### File structure

*   All JavaScript should be split into two separate areas, the generic library code and any site-specific code. Each of these will then be further separated into sub-sections based on function.
*   'library' should contain all files that are unlikely to need changing between different projects, whether they've been written in-house or they’re third-party scripts. It is likely to contain the files for the JavaScript Framework of choice, SWF Object, sIFR, any development tools, and any other files to help with Cookies, PNG fixes, etc. 
*   'site' should contain all site-specific code, plus a single ‘manager’ file to manage the various processes and keep all initialisation calls in a single place (more on this below). This ensures a single logical place to identify where and when different functions should run.

#### Importing JavaScript

*   The method for importing JavaScript files into the page is dependent on a few conditions.
*   If we have the ability to change the <head> of the HTML files for different pages and areas of the site, and if is unlikely that there will be many files, then they can be imported manually/statically by changing the files requested in each HTML page. 
*   For some sites we may not be able to change the contents of the HTML <head> for different pages/areas of the site. Other sites may require a large range of files for different pages. In either of these cases, then the alternative approach is to import a minimal number of standard scripts in the head of every HTML file, and handle the sub-loading of any required JavaScript files through a 'loader' extension. There are third party libraries that do this for you.
*   If possible, JavaScript should be imported in the foot of the page, in accordance with the Yahoo! YSlow guidelines. However this should be tested thoroughly, as it can cause layout issues in certain circumstances.

#### Serving JavaScript

*   All JavaScript functions should be kept in separate files during the build process, separated where appropriate. 
*   Whether these files are collected together into a single file for deployment depends on how many files there is likely to be for a site, and whether it can be done dynamically without losing the structure of the original files.
*   JavaScript should be served as Gzipped where possible, to avoid excessive file size.

### CSS

#### CSS Technique

*   The presentation of the websites must be controlled using CSS. It is not acceptable to use any presentational HTML.
*   Classes and IDs should be semantically named
*   Keep all CSS rules in external CSS files. No inline or embedded styles should be used except under very limited circumstances. These may include the use of background imagery for content blocks that are controlled by a CMS or database, (more...).
*   Links should be displayed as block where appropriate/possible (WHY)
*   Use background images for navigation dividers rather than HTML characters, as they are decorative rather than part of the content. This way they are not read out by screen readers or displayed for browsers without CSS support.
*   Apply class=”context” rather than display:none when hiding content for screenreaders that does not require a corresponding image. This method uses absolute positioning to hide the content which is much more screenreader friendly.
*   Duplicate :hover styles for keyboard users with :focus and :active. Consider the lack of hover states for users with non-mouse pointing devices (including touchscreens).
*   Bulletproof your builds, so when the page is resized the content scales gracefully. At the very least all content should remain legible and the layout should not break when resized to 'Larger' and 'Largest' in IE6.
*   If you are building a fixed width design, use pixel units (px) for horizontal spacing, and ems for vertical, to allow the page content to scale when font size is increased, without introducing a horizontal scrollbar.
*   Try to limit the use of position relative/absolute as it removes elements from the document order, sometimes leading to unnecessary complications. It is often needed when needing to position an element to the bottom of a container, but otherwise try first to mimic the effect with floats and margins.
*   Avoid use of !important unless no other option (as it has serious impact on cascade and future maintenance work)
*   Be more specific (e.g. ul.box rather than .box – helps with cascade and improves readability) but don't be too specific - how to communicate this? Suggestion that this is done with everything \*but\* div. Good idea, but consider impact on cascade.
*   Avoid all use of CSS 2.1 / 3 styles without an IE equivalent. For example, the use of CSS to create rounded corners on elements, or to style the first/*n*th matched element. (WHY)
*   Opacity can be used as there is an IE-specific alternative, although it must be made known that it's use also affects the transparency of all child elements.
*   setting out hover, visited, active styles, the correct order MERGE THIS
*   use of :active & outline:none in CSS? Avoid (WHY)
*   Don't use absolute paths in CSS for image refs (WHY)
*   Use class and id on body. EXCEPTION: can't do this on body, need to use a wrapper div instead.

#### CSS Formatting

Most of these are convention, not function.

*   Properties in declaration blocks should have a preceding tab
*   Each property in a declaration block should be on it's own line.
*   Unless there is only one rule in a declaration block the opening brace should be on the same line as the selector followed by a line break and the closing brace should be on a separate line.
*   Always leave a space before the { (it makes searching easier)
*   If there is only one property it’s acceptable to have the whole declaration on one line, e.g. div#id {width:100%;}
*   It's also acceptable to bunch single-line blocks together when declaring a list of backgrounds (for example)
*   End each rule with a semi-colon (even if it’s the only rule in a block)
*   No spaces between property and value (e.g. color:#fff;.item:property - easier to tidy (search and replace) than pushing all to "item : property" or "item: property" or "item :property".readability is arguable. two less characters to type on each dec
*   Use short forms for colours where possible (e.g. #fff not #ffffff, #069 not #006699)
*   Make sure colour values are lowercase (e.g. #cce3f1 not #CCE3F1)
*   Use short forms for margin/padding where possible (e.g. padding:0 not padding:0 0 0 0;)
*   Aside from absolute positioning properties (top, left etc) use 0 not 0px (you can use other types of unit; 0 is 0 regardless)
*   Alphabetize properties in declaration blocks (anal helps prevent re-declaration bugs and improves readability. NO. Alternative method TBD.
*   all in lower case; CSS case sensitive (stricter browsers pay attention), consistency, only alt is mixed or uppercase

#### CSS comments

*   When do we use CSS comments? See how this goes - we don't want to comment everything.
*   Need to find a decent way to differentiate between comments about a specific selector style, and comments for file structure
*   Fin: Use of normally unused character such as ‘=’ to denote main sections. That way u can tab thru on a ctrl + F without having to scroll forever. Here's an example of how I do it:

> /* = Header section  
> \---|\---|\---|\---|\---|\---|\---|\---|\---|\---|\---|\---|\---|\---|\---|\---|\---|-- */  
> 
NB: The dashes serve as a visual underline to a header also.

*   This being the case, we need to find a replacement for /* T */
*   Fin: Should we define a colour and font glossary at the top also? Highlighting things like main colours of links, hovers, background colours, borders, text size in different areas etc? YES. Fin to provide example.

#### CSS ordering

1.  html elements - headings, lists, tables, forms, text, misc, links
2.  global classes
3.  global ids (page structure) - wrapper, header, footer, breadcrumb, nav, content, etc...
4.  page/area-specific ids

*   Fin: I structure my CSS based on the structure of my html - header at the top, footer at the bottom etc. So therefore would normally include a commented table of contents
*   Fin: When a site has lots of navigation elements (primary, secondary, tertiary and footer) should they be grouped together in one commented section? I have done this in the past and its paid off in terms of updating/maintenance. If the navigation is based on the John Lewis example I would think that this should be considered

#### CSS files

*   Method to import CSS <link/ >
*   Tweaks CSS file for IE - Separate IE6 & IE7 stylesheets? No, but possibly rename tweaks to represent less-than-IE7 to allow for possible further growth, maybe tweaks-lte-ie7.css?
*   Mobile stylesheet. Maybe just iphone help?
*   Fin: Is this a site where we should have separate stylesheets? It would seem so to me - a separate sheet for database or table driven pages perhaps? TBD

#### CSS naming conventions

*   Do we have a standard set of names, such as 'header', 'footer', 'navigation', 'breadcrumb', 'main', 'content', 'wrapper' etc NEEDS SCOPE EXERCISE

*   Keep CSS names as semantic as possible
*   use abbreviations? nav or navigation, ftr or footer? Abbreviations? To see in sample stylesheet
*   Allow class names for style? e.g. clearfix, float-left, etc...LIMITED, just clearfix depending on circumstances
*   Fin: My usual method of working is to define standard stuff first - things that apply to many elements. This even goes as far as having a standard definition for float:left;/display:inline; at the top of the page to which u add any/every element (FnE method) – that way u don’t have to go searching for each class or id in order to add the float definition. Reasoning behind this is so that we have standard elements and if there is a change later then we simply add another class and make the alterations to the norm based on that new name.

#### CSS Reset

*   Don't use * {} reset; has knock-on impacts and reduces speed
*   Meyer plus a few custom styles (vertical-align for images)
*   Not as separate stylesheet, included at top to reduce HTTP requests

#### CSS Hack management

*   Use conditional comments for IE hack management.
*   Isolate hacks in tweaks.css; re-create a declaration block in this and note where something has changed in the main CSS by using a /* T */ comment. THIS COMMENT TO BE REPLACED
*   Don’t use hacks based on unsupported CSS3 selectors to target browsers.
*   Avoid the use of clearing divs if possible. Instead try to use FnE Method or clearfix if FnE not appropriate (e.g. when modules in content need to be re-ordered).
*   Avoid voice-family hack. It's messy and hard to parse. Instead use Star HTML hack combined with backslash hack.

### HTML

*   Don't use <h1> to define the site title. Use it to define the page title. If there isn't an obvious page title in designs/wireframes, either talk to designers and IAs or use a hidden contextual heading.
*   Headings should be used in the proper sequence - don't skip from <h1> to <h3>, for example 
*   When presenting a list of items, use an appropriate list construct such as <ul>, <ol>, or <dl>. Do not use paragraph or other tags. Do not use <dl> for anything other than pure term -> definition structures. Just because the structure may fit it doesn't mean it'll work semantically.
*   Alt attribute text should be meaningful and describe the content of the image. Note that if this is likely to lead to repitition in the flow of the page (e.g. an image represents the same information as a heading) it's better to use no alt text to avoid repitition.
*   Don't use <base href="..." /> tag (WHY)
*   HTML language attribute specifics
*   Don't use title attributes (with possible exceptions). Research SEO (lack of) impact.
*   Declare all attributes using double quotes ( " ) rather than single quotes ( ' ).
*   Declare width/height on images
*   Main page areas named as header, footer, wrapper, etc - a structural versus layout approach
*   Fin: I always define widths by column only - that way the code for a portlet/module that resides in a narrow left hand column can be copied in full and dropped in a wider central column and it will automatically scale to fit the width. This way we can also style a module by where it sits on a page by targeting the column id/class

(Fin: I like to build a structure without thought for the design - using wireframe docs to map out a standard template. And then fold that into the design by finding out where necessary extra tags have to be added to cater for design elements to be added (content-out build approach). This rids the build of unnecessary html elements.)

#### <head> tags

Need something to cover X-UA i.e. DO NOT USE.

> <meta http-equiv="X-UA-Compatible" content="IE=7" />

Depending on projected lifespan of site we would recommend against using this technique as site will be frozen at IE7 levels of support for life of site (5 years?) and refactoring to take into account IE8 is easier now than later. Also, the version of the IE7 rendering engine built in to IE8 is not the same as IE7-proper so may increase test time anyway.

*   [IE8: Standards Mode Opt-In is Back From the Dead][8]
*   [IEBlog: Just The Facts: Recap of Compatibility View][9]

The following tags should be used in the <head> on all pages.

*   <title> (expand on how this should work)
*   Description (expand on how this should work)
*   Keywords
*   Content type text/html?
*   favicon
*   iphone icon
*   IE imagetoolbar
*   IE MSSmartTagsPreventParsing
*   More from BaseCSS?
*   NO ODP
*   iPhone viewport
*   iPhone touch icon <link rel="apple-touch-icon" href="_format/icons/apple-touch-icon.png"/>

The following tags should not be used.

*   Dublin Core
*   <meta http-equiv="expires" content="date">
*   <meta http-equiv="cache-control" content="no-cache">
*   <meta http-equiv="pragma" content="no-cache">
*   <meta http-equiv="msthemecompatible" content="no" /> (can trigger [bug in old FF][10] )
*   <meta http-equiv="content-language" content="en-gb">
*   <meta http-equiv="refresh" content="15;url=http://domain.com/page.html">

Any cache control should be handled on server, not in-page.

The following tags should be added only after agreement with client.

*   rating
*   PICS?
*   <meta name="copyright" content="Copyright owner" />
*   <meta name="author" content="Author" />
*   <meta name="robots" content="all">
*   <meta name="robots" content="index,nofollow">
*   <meta name="robots" content="noindex,follow">
*   <meta name="robots" content="none">
*   <meta name="robots" content="noarchive">
*   <meta name="googlebot" content="noarchive">

Data for Dublin Core tags can be difficult to construct and populate and offers few (if any) real-world benefits. However, [eGMS][11] (an application profile of Dublin Core) should be implemented for UK government sites when required.

#### Comments

*   Avoid; can trigger odd float bugs, adds needless weight to pages. Well-structured HTML, commented CSS and tools like Firebug should be adequate to understand structure.

#### Links

*   Never use "Click here" as anchor text: device dependent, offers no context
*   Don't repeat link text on the page (e.g. "Read more"). If forced to do so, hide additional contextual information using context class. Example would be nice.
*   Don't repeat link text in title attribute. Excessive, offers no real-world benefits.

#### Forms

This whole section needs sorting.

*   Group related fields together using the <fieldset> element
*   Name each <fieldset> with a valid <legend>. This can be hidden using CSS.
*   Create <labels> for every element and ensure you associate the label with its corresponding field using the “for” attribute where appropriate. This is especially important on radio buttons and checkboxes so that the user can click the label as well as the control to select the option.
*   Do not use tables for formatting.
*   Display legends wherever possible, otherwise hide.

#### Tables

*   Wherever possible, table styles should be generic and re-usable then over-ridden for specific instances.
*   Tables must be used for tabular data (any information that has a two dimensional relationship)
*   Include cellpadding, cellspacing and border attributes on the table tag for non-css browser support
*   Use thead, tbody, colgroup, caption, title, summary th, td. Double-check this and give an example table
*   Should we advocate the use of scope or id/header?
*   Use scope on the <th>'s in a single level table that has headers in both columns and rows. But if there are multiple levels of headers, go for full on headers and id.
*   Don't use built-in classes for zebra striping on tables; use an ID on the table and script it instead (why? it's a nice-to-have, not critical, and takes up weight - consider it behaviour).

#### Links

*   Opening external links in a new window is often requested by clients but can cause serious usability issues. Note that the target attribute is deprecated in XXX. Instead, use JavaScript with a rel="external" attribute for external links. This has the side-benefit of being easily disabled without having to change any mark-up.

#### Microformats

Use? If so, to what extent? Suggest only hCard for main details. More complex microformats after agreement with client (don't want to expose an informal API without approval, particular with e-commerce).

### Print stylesheets

Need to cover this.

Do we use CSS/JS to either expand links or footnote them or keep it simple?

### Flash

*   SWF Object 2.1 for embedding, dynamically through javascript
*   Alternative content?
*   Flash video/audio player?
*   FLVs and streaming?
*   Flash paths?

### Images

*   Formats - PNG8 and JPEG only, no GIF.
*   Cut structural images from PSDs, not JPEGs. Cut assets from high quality JPEGs.
*   Image crunching (non-lossy)- [smush.it][12]
*   Image crunching (lossy). Set photoshop to 55 for JPEG quality, optimize further as needed.
*   CSS Sprites
*   Handling transparency EXPAND
*   explicitly declare width and height?
*   Where images live in structure and why (\_format vs \_assets)
*   Inline images vs. background images SPEC THIS
*   Image replacement techniques for titles / logos?

### SEO

Nothing to add here yet.

But... follow Google's guidelines: [Optimize your crawling & indexing][13].

### Specific coding examples

#### Multiple backgrounds

When the need arises for an element to have both a top and bottom background image, what is our approach:

> <div class="block"> ... </div><div class="block_close"></div>  
> 
(or)

> <div class="block"><div> ... </div></div>  
> 
(or)

> <div class="block_container"><div class="block"> ... </div></div>  
> 
More to follow...

## Server config

Anything front-end that falls outside the scope of pure templating.

### Canonical domain

Check redirects from www. and other subdomains to make sure main domain is, in fact, canonical.

### Relevant HPW/Exceptional performance stuff

Lots to do here.

### Sitemap.xml

Very important these days.

### Metadata

Good title tag and meta description tag contents are necessary.

Meta keywords less useful but still worth doing.

### Robots.txt

Obvious use is controlling access by crawlers (but shouldn't be used for security as very discoverable).

Also used to point to sitemap.xml

### Webmaster tools

Google, Yahoo, MSN. Benefits, including canonical particularly with faceted nav.

Recommend doing with file or metatag?

http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html

http://multichannelmerchant.com/ecommerce/0201-natural-search-spam/

### Tracking

*   Should it be converted to XHTML-valid or left as-is?

### 301 redirects

Strongly recommended if relaunching a site and changing URL structure.

### Feeds

Recommend Atom, recommend Feedburner?

Also, if moving feeds 301 them.

### Cookies

Any impact on performance?

Impact on privacy (policies) etc

### Recommended URL structure

Grouping words together without using dividers is generally not a good idea. Dashes ("-") are generally treated as spaces by search engines looking for keywords in URLs and are generally considered to be the best URL divider. Underscores ("_") are second best.

The forward slash is recognised as a terminator by search engines and determines depth and should give greater priority to pages at a higher level. If everything in the site is in the root it means everything has the same priority which isn't particularly useful. Ideally avoid going deeper than 4 levels but if site architecture demands it then do it.

A few general rules...

*   Keep everything lowercase
*   Convert special characters (e.g. "&" - expand to "and", "/" - convert to dash
*   Ignore special characters like apostrophes and question marks
*   Avoid any file extensions (rewrite URLs to remove index.php or similar).

Be aware that IE6 and IE7 have some problems with creating cookies if there are any non-alphanumeric characters (dash "-" is OK, but underscore is bad "\_") in the domain name (e.g.: http://www.super\_website.co.uk/). This can cause serious problems in the functionality like logging in, etc.

Creating proper, hierarchical URLs is helpful for people who look and navigate by URL. This is generally for more technical users but is reasonably common with that demographic. For example, there's a Firefox extension called "Go-up" that allows you to hit ALT-up arrow to go up a directory. Some browsers also have this functionality built in.

URLs should be permanently unique. Don't re-use old URLs for new content.

URLs should be short. Short URLs encourage e-mailing and linking, which bring in traffic. Long URLs often get split onto multiple lines in e-mails, generating frustrating 404 errors when they’re clicked.

More here:

*   <http://www.ashbykuhlman.net/blog/2003/07/27/2227>
*   <http://www.seomoz.org/blogdetail.php?ID=1422>
*   <http://www.centernetworks.com/top-3-reasons-to-use-clean-urls>

Quote from last:

> "Hackability is just as important. Predictable, hackable URL schemes invite intelligent re-use of web resources - both for regular web sites and web service APIs."

 [1]: http://en.wikipedia.org/wiki/Comet_%28programming%29
 [2]: http://www.w3.org/TR/WCAG20/
 [3]: http://www.w3.org/WAI/WCAG20/wcag2faq#done
 [4]: http://www.clagnut.com/blog/348/
 [5]: http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
 [6]: http://www.mezzoblue.com/tests/revised-image-replacement/#gilderlevin
 [7]: http://designintellection.com/2008/this-is-how-you-get-sifr-to-work/
 [8]: http://www.sitepoint.com/blogs/2009/02/19/ie8-standards-mode-opt-in/
 [9]: http://blogs.msdn.com/ie/archive/2009/02/16/just-the-facts-recap-of-compatibility-view.aspx
 [10]: https://bugzilla.mozilla.org/show_bug.cgi?id=420363
 [11]: http://www.esd.org.uk/standards/egms/
 [12]: http://smush.it/
 [13]: http://googlewebmastercentral.blogspot.com/2009/08/optimize-your-crawling-indexing.html