CSS, JS, fonts and assets shared between the VI and ATP websites, to ensure easier feature support and implementations for any of the projects that add `sharedweb` as a Git submodule.

Certain features such as JS were streamlined into a `feature` approach, where one `common.js` file is used, which checks the website for <meta name="feature-{feature}" content="{true/false}"/> which enables or disables loading specific code.
