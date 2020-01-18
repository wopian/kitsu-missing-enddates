# Kitsu Missing Enddates

A CLI tool to aid with database maintenance

## Usage

### Install

```
yarn global add kitsu-missing-enddates
npm install -g kitsu-missing-enddates
```

### Command

```
kmed [--subtype] [--onlyNSFW]
kitsu-missing-enddates [--subtype] [--onlyNSFW]
```

### Parameters

#### subtype (String, alias `s`)

Defaults to `tv,ona,ova,movie,music,special`

Seperate multiple subtypes by commas (e.g `--subtype tv,ona`)

Possible values:
- `tv`
- `ona`
- `ova`
- `movie`
- `music`
- `special`

#### onlyNSFW (Boolean, alias 'o')

Defaults to `false`

Returns only NSFW entries (useful if you've previously run the CLI without logging in)

### Allowing NSFW entries

1. Copy `env.template.mjs` to `env.mjs`
2. Add your username (email or [slug/profile URL](https://kitsu.io/settings/profile)) and password
3. Run the CLI
