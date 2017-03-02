/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { analytics } from '../config';

class Html extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        styles: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            cssText: PropTypes.string.isRequired,
        }).isRequired),
        scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
        children: PropTypes.string.isRequired,
    };

    static defaultProps = {
        styles: [],
        scripts: [],
    };

    render () {
        const { title, description, styles, scripts, children } = this.props;
        return (
            <html className="no-js" lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                    <meta name="theme-color" content="#ffffff" />
                    {styles.map(style =>
                        <style
                            key={style.id}
                            id={style.id}
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: style.cssText }}
                        />,
                    )}
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                        crossOrigin="anonymous"
                    />
                </head>
                <body>
                    <div
                        id="app"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: children }}
                    />
                    {scripts.map(script => <script key={script} src={script} />)}
                    {analytics.google.trackingId &&
                    <script
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                            `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')`,
                        }}
                    />
                    }
                    {
                        analytics.google.trackingId &&
                        <script src="https://www.google-analytics.com/analytics.js" async defer />
                    }
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />
                    <script
                        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
                        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
                        crossOrigin="anonymous"
                    />
                </body>
            </html>
        );
    }
}

export default Html;
