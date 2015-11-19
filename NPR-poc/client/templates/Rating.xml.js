/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A rating template allows the user to adjust the rating of a particular item, such as a movie or song.

To handle rating changes, add a listener for the change event. The event object will contain a property named "value" ranging from 0.2 (1 star) to 1.0 (5 stars)
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8"?>
<document>
	<ratingTemplate>
	    <title>Rate Lorem Ipsum</title>
	    <ratingBadge value="0.6"></ratingBadge>
	</ratingTemplate>
</document>`
}