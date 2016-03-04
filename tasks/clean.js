import del from 'del';

export function clean(cb) {
  del(['build']).then(() => {
    cb();
  });
}
