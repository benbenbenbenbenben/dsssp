CHANGELOG.md

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.2] - 2024-02-25

### Fixed

- Curve animation flickering in mobile Safari

## [0.6.1] - 2024-02-23

### Fixed

- Webkit browsers didn't use `keySplines` for SVG animations without `keyTimes` property
- Removed unsupported easing types from the library

## [0.6.0] - 2024-02-23

### Added

- Native SVG path animations for filter curves (`animate`/`easing`/`duration` props for all curves)
- Every curve now has an initial path on mount
- Dotted line style option now works for all curves
- Control over dB/Gain labels (`dbLabels` prop in GraphScale)

### Changed

- Updated dependencies
- Added caching to GraphProvider
- Optimized curve rendering performance
- Refactored internal path calculation logic

## [0.5.0] - 2024-02-15

[Initial documented version]
