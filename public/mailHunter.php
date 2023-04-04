<?php
$url = $_GET[ 'domain' ];
$path = $_GET[ 'path' ];

if ( strpos( $url, 'http' ) !== 0 ) {
    $url = 'http://' . $url;
}

if ( $path !== 0 && strpos( $path, '/' ) === 0 ) {
    $path = '/' . $path;
}

class mailHunter {
    function __construct( $url, $path = "" ) {
        $this->url = $url;
        $this->path = $path;
        $this->visited = array();
        $this->emails = array();
    }

    function look_for_emails() {
        return json_encode( $this->get_emails( $this->url, $this->visited, $this->emails, $this->path ) );
    }

    function get_emails( $url, &$visited, &$emails, $path ) {
        if ( in_array( $url, $visited ) ) {
            return $emails;
        }
        
        array_push( $visited, $url );

        $html = file_get_contents( $url );
        mb_internal_encoding( "UTF-8" );
        $html = mb_convert_encoding( $html, 'HTML-ENTITIES', 'UTF-8' );

        $matches = array();
        $regex = '/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/';
        preg_match_all( $regex, $html, $matches );
        $emails = array_merge( $emails, array_unique( $matches[0] ) );

        $doc = new DOMDocument();
        @$doc->loadHTML( $html );

        $links = $doc->getElementsByTagName( 'a' );

        foreach ( $links as $link ) {
            $suburl = $link->getAttribute( 'href' );
            $suburl_parsed = parse_url( $suburl );

            if ( ( isset( $suburl_parsed[ 'host' ] ) && 
                 $suburl_parsed[ 'host' ] !== parse_url( $url )[ 'host' ] && 
                 $suburl_parsed[ 'host' ] !== "www.".parse_url( $url )[ 'host' ] ) ||
                 strpos( $suburl, 'tel' ) === 0 ||
                 in_array( $suburl, $visited ) ) {
                continue;
            }

            if ( strpos( $suburl, 'mailto' ) === 0 ) {
                array_push( $emails, str_replace( "mailto:", "", $suburl) );
                continue;
            }

            if ( strpos( $suburl, '#' ) === 0 || strpos( $suburl, 'http' ) !== 0 ) {
                $suburl = "http://" . parse_url( $url )[ 'host' ] . parse_url( $url )[ 'path' ] . $suburl;
            }

            $_SESSION[ 'progress' ] = $suburl;

            if ( $path !== "" ) {
                if ( str_contains( $suburl_parsed[ 'path' ], $path ) ) {
                    array_merge( $emails, $this->get_emails( $suburl, $visited, $emails, $path ) );
                }
            } else {
                array_merge( $emails, $this->get_emails( $suburl, $visited, $emails, $path ) );
            }
        }

        $emails = array_unique( $emails );

        return $emails;
    }
}

$mailHunter = new mailHunter( $url, $path );
echo $mailHunter->look_for_emails();

?>
