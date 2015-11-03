date= csvread('historical',1,0);
financedate= ascii2fts('historical_org');
OpenMacd=macd(financedate,'series4');

%random training data

%n day to predict

a=[date fts2mat(OpenMacd)];
a(isnan(a))=0;