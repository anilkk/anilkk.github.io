(function() {
    var colors = {},
        textColors = {};
    // Get all the nodes on a page
    var nodes = document.querySelectorAll('*');
    // Instantiate variables we'll use later
    var node, nodeArea, bgColor, i, textColor;
    // Loop through all the nodes
    for (i = 0; i < nodes.length; i++) {
        // The current node
        node = nodes[i];
        // The area in pixels occupied by the element
        nodeArea = node.clientWidth * node.clientHeight;
        // The computed background-color value
        bgColor = window.getComputedStyle(node)['background-color'];
        textColor = window.getComputedStyle(node)['color'];
        // Strip spaces from the color for succinctness
        bgColor = bgColor.replace(/ /g, '');
        // If the color is not white or fully transparent...
        if (
            bgColor != 'rgb(255,255,255)' &&
            !(bgColor.indexOf('rgba') === 0 && bgColor.substr(-3) === ',0)')
        )

        // adding the current element area to the
        // existing value.
            colors[bgColor] = (colors[bgColor] >> 0) + nodeArea;

        textColor = textColor.replace(/ /g, '');
        if (textColor != 'rgb(0,0,0)')

        // adding the current element area to the
        // existing value.
            textColors[textColor] = (textColors[textColor] >> 0) + nodeArea;
    }
    console.log('list of textColors and background-color', textColors, colors);


    function rgbToHex(R, G, B) {
        return toHex(R) + toHex(G) + toHex(B)
    }

    function toHex(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    }

})();
