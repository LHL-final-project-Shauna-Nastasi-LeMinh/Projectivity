# Design Guidelines

## MUI through NPM

### Specific Components

For full documentation on specific components, find them on the left-side menu starting here: https://mui.com/components/autocomplete/

### Installation 

If it's not installed already, run:

// with npm
npm install @mui/material @emotion/react @emotion/styled

// with yarn
yarn add @mui/material @emotion/react @emotion/styled

### Full Guide

A full guide to installation and usage is available here: https://mui.com/getting-started/installation/

## Roboto font

MUI was designed with the Roboto font in mind. Be sure to include the Roboto font in your project, for example, using Google Fonts:

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

## Font icons

To use the font Icon component, you must first add the Material icons font. For example, using Google Web Fonts:

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

## SVG icons

### Example

https://mui.com/components/icons/

### Usage

In order to use prebuilt SVG Material icons, such as those found in the icons demos you must first install the @mui/icons-material package:

// with npm
npm install @mui/icons-material

// with yarn
yarn add @mui/icons-material

## CDN - Content Delivery Network

You can start using MUI with minimal Front-end infrastructure, which is great for prototyping.

### WARNING

⚠️ Using this approach in production is discouraged though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ The UMD links are using the latest tag to point to the latest version of the library. This pointer is unstable, it shifts as we release new versions. You should consider pointing to a specific version, such as v5.0.0.

### Usage

Two Universal Module Definition (UMD) files are provided:

    one for development: https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
    one for production: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

You can follow this CDN example to quickly get started.

For example, for development, include this script tag:

<script crossorigin src="https://unpkg.com/@mui/material@latest/umd/material-ui.development.js"></script>

For production, include this script tag: 

<script crossorigin src="https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js"></script>
