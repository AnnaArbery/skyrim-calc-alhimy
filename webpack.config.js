const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');

const MODE = process.argv.includes('development') ? 'development': 'production';
const DIST_DIR = 'docs';

const config = {
  mode: MODE,
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js?v=[contenthash]',
    path: path.resolve(__dirname, DIST_DIR),
    clean: true,
  },
  devtool: (MODE === 'development') ? 'inline-source-map' : false,
  devServer: { 
    static: {
      directory: path.join(__dirname, DIST_DIR),
    },
    compress: true,
    port: 9000,
    client: {
      overlay: true,
    },
    open: true,
    // hot: true, //для фреймворков + github.com/pmmmwh/react-refresh-webpack-plugin
    // historyApiFallback: true,//для роутинга,только для dev-servera-youtu.be/acAH2_YT6bs?t=5022
  },
  module: {
    rules: [
      {
        test: /\.module\.(scss|sass)$/,
        use: useCss({
          modules: { 
            localIdentName: (MODE === 'development') ? '[path][name]__[local]':'[local]__[sha1:hash:hex:7]'
          }
        })
      },
      {
        test: /^((?!\.module).)*(scss|sass)$/,
        use: useCss()
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        // test: /\.svg$/,//как обычный url-ошибка
        // use: ['@svgr/webpack', 'url-loader'],//как url
        // use: [
        //   {
        //     loader: '@svgr/webpack',
        //     options: {
        //       icon: true
        //     }
        //   }
        // ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test webpack',
      template: path.join(__dirname, 'src/assets/', 'index.html'),
      favicon: path.join(__dirname, 'src/assets/img', 'favicon.png'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/store'), to: 'store' },
      ],
    }),
  ],
  optimization: {
    minimizer: [],
  },
};

function useCss(options = {}) {
  return [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: options,
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            ['autoprefixer', {}],
          ],
        },
      },
    },
    // 'resolve-url-loader',//для корректных ссылок в sass
    'group-css-media-queries-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: (MODE === 'development')
      }
    }
  ]
}

const configImg = {
  test: /\.(jpe?g|png|webp|gif|svg)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'img/[name][ext]'
  }
}
if(MODE == 'production') {
  configImg.use = [
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
        },
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        webp: {
          quality: 75
        },
      }
    }
  ]
  // минификация, TerserPlugin чтобы не появлялся LICENSE.tx
  if (!config.optimization.minimizer) config.optimization.minimizer = [];
  config.optimization.minimizer.push(new TerserPlugin({
    extractComments: false,
    terserOptions: {
      format: {
        comments: false,
      },
    },
  }))
}
config.module.rules.push(configImg);

module.exports = config;

// npm run dev
// @babel/core, babel-loader, @babel/preset-env, @babel/preset-typescript @babel/preset-react
// youtube.com/watch?v=5j19we1xpSA (Лаврик,2021), 21:40-модульные стили, 54:20-split-chunk
// react react-dom @babel/preset-react