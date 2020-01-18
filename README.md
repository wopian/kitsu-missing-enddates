# Kitsu Missing Enddates

A CLI tool to aid with database maintenance

## Usage

### Commands

Note: Replace `yarn` with `npm run` if you do not use Yarn.

**Default (all subtypes)**
```
yarn start
```

**Specific subtypes**
```
yarn start --subtype tv
yarn start -s tv
```

**Only include NSFW entries**
```
yarn start --onlyNSFW
yarn start -o
```

### Parameters

#### subtype (String, alias `s`)

Seperate multiple subtypes by commas (e.g `--subtype tv,ona`)

Possible values:
- `tv`
- `ona`
- `ova`
- `movie`
- `music`
- `special`

#### onlyNSFW (Boolean, alias 'o')

Returns only NSFW entries (useful if you've previously run the CLI without logging in)

### Allowing NSFW entries

