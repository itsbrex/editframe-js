## [2.4.2](https://github.com/editframe/editframe-js/compare/v2.4.1...v2.4.2) (2022-06-14)


### Bug Fixes

* remove development info from readme. add link to docs ([56aee43](https://github.com/editframe/editframe-js/commit/56aee43a3b773db02129e80d3c9c740be792a344))
* use os tmp directory ([5971a39](https://github.com/editframe/editframe-js/commit/5971a398c706ea3e04a1b982588cd5359673786f))

## [2.4.1](https://github.com/editframe/editframe-js/compare/v2.4.0...v2.4.1) (2022-06-13)


### Bug Fixes

* import defaults from shared-types. deep clone everything ([d575d17](https://github.com/editframe/editframe-js/commit/d575d176f7016c6aef530bd29cc0b08aeb430298))
* import layer/config defaults from shared-types ([f20bb4e](https://github.com/editframe/editframe-js/commit/f20bb4ec21902538b644476524534a983946812b))

# [2.4.0](https://github.com/editframe/editframe-js/compare/v2.3.0...v2.4.0) (2022-06-08)


### Bug Fixes

* add backgroundColor and padding to text ([e61c13c](https://github.com/editframe/editframe-js/commit/e61c13c466165c77c087c19adffba12dd86d37d8))
* add backgroundTransform and textTransform ([603cfb5](https://github.com/editframe/editframe-js/commit/603cfb5c4e2efe296a52567ab2737125e72780cf))
* dont supply default dimensions for addHtml ([6e61e09](https://github.com/editframe/editframe-js/commit/6e61e09c9f909bc3042f77a11431c1ef3609cf43))
* format typescript files ([7993636](https://github.com/editframe/editframe-js/commit/79936364c41c268b64881d224efc3bae25f1161d))
* remove background layer config ([0a28410](https://github.com/editframe/editframe-js/commit/0a28410f8ec3de74f21bc313671f988f73aed65d))
* update shared-types to 3.2.0 ([4bc8d9d](https://github.com/editframe/editframe-js/commit/4bc8d9d27c0d22eef1a07153d8ad66abbc37ce1f))


### Features

* log encoding state and open video when ready ([684cae9](https://github.com/editframe/editframe-js/commit/684cae914f1287499d4c3037f547e4a0c6a727e0))
* rewrite addText api ([06700a5](https://github.com/editframe/editframe-js/commit/06700a54a920a1012df387dac894ad1f537f5d9e))
* show asset uploading state in console in develop mode ([8e52c18](https://github.com/editframe/editframe-js/commit/8e52c182ba13917125218849ec09e1f8d9626e7e))

# [2.3.0](https://github.com/editframe/editframe-js/compare/v2.2.3...v2.3.0) (2022-05-25)


### Features

* add transitions ([dc639bb](https://github.com/editframe/editframe-js/commit/dc639bbd4b6c361eee19cfc6da691c2ef9aac1b2))

## [2.2.3](https://github.com/editframe/editframe-js/compare/v2.2.2...v2.2.3) (2022-05-21)


### Bug Fixes

* update shared types to 3.0.2 ([c58586f](https://github.com/editframe/editframe-js/commit/c58586fc1836092c1e0d06d3c588124ce3d416a4))

## [2.2.2](https://github.com/editframe/editframe-js/compare/v2.2.1...v2.2.2) (2022-05-06)


### Bug Fixes

* dont default lottie or video size to composition dimensions ([132713a](https://github.com/editframe/editframe-js/commit/132713af72e8b02da4c2a77adc46ba22bc560375))
* dont set default size of image layer to the composition dimensions ([3044b7d](https://github.com/editframe/editframe-js/commit/3044b7d74a66c9ebc322a3871d676e1672bd04b4))

## [2.2.1](https://github.com/editframe/editframe-js/compare/v2.2.0...v2.2.1) (2022-05-03)


### Bug Fixes

* update expected type of `perPage` in Video pagination metadata to be `number` as it has changed ([cebb488](https://github.com/editframe/editframe-js/commit/cebb4886b83f592d78c5c79b3e7e3d82d9dfa69e))

# [2.2.0](https://github.com/editframe/editframe-js/compare/v2.1.0...v2.2.0) (2022-04-28)


### Bug Fixes

* add missing position and size mixins to lottie ([f3fc72c](https://github.com/editframe/editframe-js/commit/f3fc72c15e9eaf53bf240b4876884c3853a1de08))
* deepClone layers on setting new layer. deepMerge options when adding layer ([11c6e4a](https://github.com/editframe/editframe-js/commit/11c6e4adda6d63309a742a84b5f9186d272a6844))
* use standard semantic release git config and delete version from package.json ([a6cc9e7](https://github.com/editframe/editframe-js/commit/a6cc9e7e1099e0429d533ab7d1587e0fb27cd706))
* validate duration on encode instead of composition instantiation ([79ab363](https://github.com/editframe/editframe-js/commit/79ab3638fbd7eea190b4c61b85d93ec5efbf5380))


### Features

* api overhaul ([253bfa4](https://github.com/editframe/editframe-js/commit/253bfa41829f8ee05f8f4db0fbaf8c2888547e21))
