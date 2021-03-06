# Barcode Get

Generate product labels from your OpenBravoPOS database. (PHP)

## Features

- Easy AJAX-driven web interface to search for/pick products
- Ability to edit product attributes before printing
- Ability to seamlessly generate beautiful PDF files for printing on popular
  adhesive labels (using [glabels](http://glabels.org))

## Requirements

- Linux (tested on Ubuntu 16.04, other distros should work too)
- Apache, PHP 7.0
- `glabels-3` (`sudo apt install glabels`), plus any needed fonts.
- Mysql, hosting an OpenBravoPOS database

## Installation

- Clone to your document root (or a subdirectory)
- Put a glabels template somewhere PHP can access (may require tweaks to PHP's
  `open_basedir` option)
- Copy `config.php.skel` to `config.php` and edit it, adding database info and
  the location of the template file

## Tips

- Pick a representative sample of your products, and click "Get CSV" to get a
  CSV file. This file is identical to what's fed to glabels behind the scene
  for PDF generation. Use this CSV file to design and test your label template,
  and when you're done upload it to your server.
- When printing your PDF on to adhesive labels, make sure to disable any
  scaling options on your PDF viewer's print dialog, otherwise it may not line
  up with the stickers!
- For really fast turn-around testing with a headless server, put your template
  in an NFS share, and mount it on your server. You can edit the template on
  your workstation, and to test it just click "Get PDF" in the app to preview
  your changes live.
