importo React nga "react" ;
 importo { Hapësirë , Etiketë , Këshillë për mjetin , Tipografi } nga "antd" ;
 importo {
 Libër i Përshkruar ,
 Rrethi i Orës i Konturuar ,
 Mjedisi i Përvijuar ,
 Ekipi i Përshkruar ,
 } nga "@ant-design/icons" ;
 importoni { Seksion } nga "../../../hooks/seksion/useSeksionetAktive" ;
 importo { getColor , SLOT_H , toMinutes } nga "./orariConstants" ;
 importo { E BARDHË } nga "../../../styles/common" ;

 const { Tekst } = Tipografia ;

 Props-i i ndërfaqes {
 s : Seksioni ;
 lartësiaPx ?: numri ;
 }

 const SectionBlock : React.FC <Props> = ({ s , heightPx }) => {
 const c = getColor ( s . lloji );
 const kohëzgjatjaH = ( toMinutes ( s . ore_mbarimi ) - toMinutes ( s . ore_fillimi )) / 60 ;
 const height = heightPx ?? Math.max ( durationH * SLOT_H - 8 , 44 );

 const tooltipContent = (
 < Drejtimi i hapësirës = "vertikale" madhësia = { 2 } stili = { { fontSize : 12 } } >
 < Teksti i fortë stil = { { ngjyra : E BARDHË } } >
 { s . lenda . emer }
 </ Tekst >
 < Madhësia e hapësirës = {4} >​
 < ClockRreth i Përvijuar />
 <hap>​​
 { s . ore_fillimi } – { s . ore_mbarimi }
 </ span >
 </ Hapësirë ​​>
 < Madhësia e hapësirës = {4} >​
 < Mjedisi i Përshkruar />
 < hapësirë ​​>
 Salla { s . salla . nr } , { s . salla . godin }
 </ span >
 </ Hapësirë ​​>
 < Madhësia e hapësirës = {4} >​
 < TeamOutlined />
 < hapësirë ​​>
 Grupi { s . grupi } · { s . nr_studenteve } studentë
 </ span >
 </ Hapësirë ​​>
 < Madhësia e hapësirës = {4} >​
 < BookOutlined />
 < span > { s . lenda . kod } </ span >
 </ Hapësirë ​​>
 < Tag color = { c.antColor } style = { { marginTop :​​ 2 } } >
 { s . lloji }
 </ Etiketë >
 </ Hapësirë ​​>
 );

 kthim (
 < Tooltip title = { tooltipContent } color = "#1e293b" placement = "sipër" >
 < div
 stili = { {
          sfond : c . bg ,
          kufiri : `1.5px solid ${ c . border } ` ,
          Rrezja kufitare : 8 ,
          mbushje : " 4px 7px"
          lartësia ,
          tejmbushje : "i fshehur" ,
          kursori: "parazgjedhur" ,
          Madhësia e kutisë: "kuti kufitare" ,
 } }
 >
 < Tekst
 i fortë
 stili = { {
            Madhësia e fontit: 11 ,
            ngjyra: c . tekst ,
            shfaqje: "bllok" ,
            Hapësirë ​​e bardhë: "nowrap "
            tejmbushje: "i fshehur" ,
            Mbikalimi i tekstit: "elipsë" ,
 } }
 >
 { s . lenda . emer }
 </ Tekst >
 < Stili i tekstit = { { Madhësia e fontit: 10 , ngjyra: c . tekst , tejdukshmëri: 0.85 , ekrani: "blloko" } } >
 { s . ore_fillimi } – { s . ore_mbarimi }
 </ Tekst >
 < Tekst
 stili = { {
            Madhësia e fontit: 10 ,
            ngjyra: c . tekst ,
            tejdukshmëria: 0.75 ,
            shfaqje: "bllok" ,
            Hapësirë ​​e bardhë: "nowrap "
            tejmbushje: "i fshehur" ,
            Mbikalimi i tekstit: "elipsë" ,
 } }
 >
 { s . lloji } · Salla { s . salla . nr }
 </ Tekst >
 < Stili i tekstit = { { Madhësia e fontit: 10 , ngjyra: c . tekst , tejdukshmëri: 0.65 , ekrani: "blloko" } } >
 Gr. { s . grupi } · { s . nr_studenteve } std
 </ Tekst >
 </div>​​
 </ Këshillë mjeti >
 );
 };

 eksporto SectionBlock si parazgjedhje ;