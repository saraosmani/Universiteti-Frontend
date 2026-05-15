importo React nga "react" ;
 importo { Kartë } nga "antd" ;
 importoni { Seksion } nga "../../../hooks/seksion/useSeksionetAktive" ;
 importo { DITË , KOHË_SLOTS , SLOT_H , nëMinute , ETIKETA_DITESH } nga "./orariConstants" ;
 importo SectionBlock nga "./SectionBlock" ;
 importo { NGJYRË MARINE , E BARDHË } nga "../../../styles/common" ;

 Props-i i ndërfaqes {
 byDay : Record < string , Seksion []>;
 }

 const GRID_START = toMinutes ( TIME_SLOTS [ 0 ]); // p.sh. 08:00 = 480 min
 const TOTAL_H = TIME_SLOTS.length * SLOT_H ;

 const OrariTimetable : React.FC <Props> = ({ byDay }) => (
 < Kartë
 bodyStyle = { { mbushje : 0 , tejmbushje : "automatik" } }
 stili = { { borderRadius :}} 14 , kufiri : "1px i ngurtë #E2E8F0" } }
 >
 < div
 stili = { {
        shfaqje : "rrjet" ,
        gridTemplateColumns : `56px përsëritje( ${ DAYS . gjatësi } , 1fr)` ,
        Gjerësia minimale : 700 ,
 } }
 >
 { /* Rreshti i kokës */ }
 < div style = { { sfond : NGJYRË MARINE , mbushje : "12px 8px" , borderDjathtas : "1px i ngurtë #1e3a8a" } } />
 { DITË . hartë ( ( ditë ) => (
        < div
          çelësi = { ditë }
          stili = { {
            sfond : MARINA ,
            ngjyra : E BARDHË ,
            mbushje : " 12px 10px"
            Rreshtimi i tekstit : "qendër" ,
            Pesha e fontit : 700 ,
            Madhësia e fontit : 13 ,
            kufiri i djathtë : "1px i ngurtë #1e3a8a" ,
 } }
        >
          { DAY_LABELS [ ditë ] }
        </div>​​
 )) }

 { /* Kolona e etiketës së kohës */ }
 < div style = { { sfond : "#F8FAFC" , borderRight : "1px i ngurtë #E2E8F0" } } >
 { TIME_SLOTS . hartë ( ( vend , idx ) => (
          < div
            çelësi = { vend i caktuar }
            stili = { {
              lartësia : SLOT_H ,
              mbushje : "8px 6px 0" ,
              shfaqje : "përkulje" ,
              rreshto artikujt : "fillim fleksibël" ,
              Madhësia e fontit : 11 ,
              ngjyra : "# 94A3B8 "
              Pesha e fontit : 600 ,
              kufiri Fundi : idx === TIME_SLOTS . gjatësia - 1 ? "asnjë" : "1px solid #F1F5F9" ,
              Madhësia e kutisë : "kuti kufitare" ,
 } }
          >
            { vend i caktuar }
          </div>​​
 )) }
 </div>​​

 { /* Kolonat e ditës — blloqe të pozicionuara absolutisht */ }
 { DITË . hartë ( ( ditë ) => (
        < div
          çelësi = { ditë }
          stili = { {
            pozicioni : "i afërm" ,
            lartësia : TOTAL_H ,
            kufiri i djathtë : "1px i ngurtë #E2E8F0" ,
            sfond : E BARDHË ,
 } }
        >
          { /* Vijat udhëzuese horizontale të orës */ }
          { TIME_SLOTS . hartë ( ( vend , idx ) => (
            < div
              çelësi = { vend i caktuar }
              stili = { {
                pozicioni : "absolute" ,
                maja : idx * SLOT_H ,
                majtas : 0 ,
                djathtas : 0 ,
                kufiri Fundi : idx === TIME_SLOTS . gjatësia - 1 ? "asnjë" : "1px solid #F1F5F9" ,
                lartësia : SLOT_H ,
                Ngjarjet e treguesit : "asnjë" ,
 } }
            />
 )) }

          { /* Blloqe seksionesh */ }
          { byDay [ ditë ]. hartë (( s ) => {
            konst startMin = toMinutes ( s . ore_fillimi );
            konst endMin = toMinutes ( s . ore_mbarimi );
            konst maja = (( min fillimi - GRID_START ) / 60 ) * SLOT_H + 2 ;
            konst lartësia = Math.max ( (( endMin - startMin ) / 60 ) * SLOT_H - 4 , 28 ) ;
            kthim (
              < div
                çelësi = { s . sek_id }
                stili = { {
                  pozicioni : "absolute" ,
                  majë ,
                  majtas : 3 ,
                  djathtas : 3 ,
                  lartësia ,
 } }
              >
                < Blloku i Seksionit s = { s } lartësiaPx = { lartësia } />
              </div>​​
 );
 }) }
        </div>​​
 )) }
 </div>​​
 </ Kartë >
 );

 eksporto OrariTimetable të parazgjedhur ;