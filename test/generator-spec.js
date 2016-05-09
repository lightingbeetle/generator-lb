import { join } from 'path';
import assert from 'yeoman-assert';
import helpers  from 'yeoman-test';
import test from 'tape';

const defaultPrompt = {
  optIn: false,
  name: 'test of generator',
  features: [],
  sassCompilator: 'libSass',
  includeMultiLanguage: false,
  dataFormat: 'yaml',
};

function testExpected(expected) {
  expected.forEach((file) => {
    if (typeof file === 'string') {
      assert.file(file);
    } else if (Array.isArray(file)) {
      assert.fileContent(...file);
    }
  });
}

function runTest(prompt) {
  return new Promise((resolve, reject) => {
    helpers.run(join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts(prompt)
      .on('end', () => resolve())
      .on('error', (err) => reject(err));
  });
}

function handleError(err, t) {
  t.error(err);
  t.end();
}

test('generator-lb:defaults', (t) => {
  const prompt = defaultPrompt;
  
  const expected = [
    'package.json',
    ['package.json', /\"name\": \"test-of-generator\"/],
    ['package.json', /node-sass/],
    ['package.json', /gulp-sass/],
    'gulpfile.js',
    'gulp/tasks/browserSync.js',
    'gulp/tasks/clean.js',
    'gulp/tasks/default.js',
    'gulp/tasks/deploy.js',
    'gulp/tasks/images.js',
    'gulp/tasks/templates.js',
    'gulp/tasks/watch.js',
    'gulp/utils/buildHelper.js',
    'gulp/utils/handleError.js',
    'gulp/config.js',
    'gulp/tasks/build.js',
    'gulp/tasks/copy.js',
    'gulp/tasks/serve.js',
    'gulp/tasks/scripts.js',
    'gulp/tasks/styles.js',
    'readme.md',
    '.gitignore',
    '.gitattributes',
    '.env',
    '.eslintrc',
    '.eslintignore',
    '.editorconfig',
    'app/styles/main.scss',
    'app/views/index.jade',
    'app/views/layouts/_default.jade',
    'app/views/modules/_header.jade',
    'app/views/modules/_footer.jade',
    'app/views/data/index.yaml',
    'app/.htaccess',
    'app/favicon.ico',
    'app/robots.txt',
    'app/scripts/main.js'
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'All files present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:bootstrap', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    features: ['includeFEFramework'],
    feFramework: 'includeBootstrap',
  });
  
  const expected = [
    ['package.json', /bootstrap-sass/],
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'bootstrap-sass present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:foundation', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    features: ['includeFEFramework'],
    feFramework: 'includeFoundation',
  });
  
  const expected = [
    ['package.json', /foundation-sites/],
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'foundation-sites present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:modernizr', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    features: ['includeModernizr']
  });
  
  const expected = [
    'gulp/tasks/modernizr.js',
    ['package.json', /gulp-modernizr/],
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'modernizr present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:jquery1', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    features: ['includejQuery'],
    jQuery: 'includejQuery1',
  });
  
  const expected = [
    ['package.json', /\"jquery\":\"~1.11.3\"/],
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'jQuery 1.x.x present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:jquery2', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    features: ['includejQuery'],
    jQuery: 'includejQuery2',
  });
  
  const expected = [
    ['package.json', /\"jquery\":\"~2.1.4\"/],
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'jQuery 2.x.x present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:lightingFly', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    features: ['includeLightingFly'],
  });
  
  const expected = [
    ['package.json', /lightingfly/],
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'lightingFly present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:libSass', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    sassCompilator: ['libSass']
  });
  
  const expected = [
    ['package.json', /gulp-sass/],
    ['package.json', /node-sass/],
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'libSass present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:rubySass', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    sassCompilator: ['rubySass']
  });
  
  const expected = [
    ['package.json', /gulp-ruby-sass/],
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'rubySass present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:multiLanguage', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    includeMultiLanguage: true,
  });
  
  const expected = [
    ['package.json', /merge-stream/],
    ['gulp/config.js', /var languages/]
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'multi-language support present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:YAML', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    dataFormat: 'yaml',
  });
  
  const expected = [
    'app/views/data/index.yaml',
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'YAML formatting present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});

test('generator-lb:JSON', (t) => {
  const prompt = Object.assign(defaultPrompt, {
    dataFormat: 'json',
  });
  
  const expected = [
    'app/views/data/index.json',
  ];
  
  runTest(prompt)
    .then(() => {
      t.doesNotThrow(() => testExpected(expected), null, 'JSON formatting present');
      t.end();
    })
    .catch((err) => handleError(err, t));
});
