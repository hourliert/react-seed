export default class IdMapper {
  map = {};
  nextId = 0;

  static generateRandomId() {
    return Math.random().toString(36).substring(7);
  }

  constructor(prefix = IdMapper.generateRandomId()) {
    this.prefix = prefix;
  }

  getNumericId(realId) {
    return this.map[realId];
  }

  get(realId) {
    const id = this.getNumericId(realId);

    if (!id) return undefined;
    return `${this.prefix}_${id}`;
  }

  getOrNext(realId) {
    if (this.map[realId]) return this.get(realId);

    return this.next(realId);
  }

  next(realId) {
    this.nextId++;
    this.map[realId] = this.nextId;

    return this.get(realId);
  }
}
