import { TestBed } from '@angular/core/testing';

import { MsgResolver } from './msg.resolver';

describe('MsgResolver', () => {
  let resolver: MsgResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MsgResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
