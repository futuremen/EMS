/****************************************************************************************************

��������WebSeal						��ҳ���»���д
��  ����doaction					�������ͣ�0 ���£�1 ��дǩ��
		id							ӡ�»���дΩһid������Ϊ�գ�Ϊ��������
		user						�����û����ƣ�����Ϊ�գ�Ϊ�����ȡ֤���û���
		stype						�������ͣ�0 �󶨹̶��ַ���1 ��ָ���༭��id
		stxt						�������ݣ�
										��stypeΪ0ʱ��Ϊ�̶��ַ���
										��stypeΪ1ʱ��Ϊ�������id
		sid							��ʾ��λ�ã����λ�õ�����div��td��id
		sPostion					��ʾλ�õ�ƫ��ֵ����԰���������Ͻ�0,0����ʽΪx:y   ���� 200:200
		httpaddr					��������ַ��ֻ�з����������Ҫ���ã�����Ϊ�ա�

*****************************************************************************************************/
function WebSeal(doaction,id,user,stype,stxt,sid,sPostion,httpaddr) {
	var WebObj = document.getElementById("DWebSignSeal");
	
	if(stype==1){
		WebObj.SetSignData("+LIST:"+stxt+";");
	}else if(stype==0){
		WebObj.SetSignData("+DATA:"+stxt);
	}
	
	WebObj.SetCurrUser(user);
	WebObj.HttpAddress = "http://"+httpaddr+":8089/inc/seal_interface/";
	WebObj.RemoteID = "0100018";
	var str=sPostion.split(":");
	WebObj.SetPosition(str[0],str[1],sid);
	
	if(doaction==0){
		var sealid=document.all.DWebSignSeal.AddSeal("", id);
	}else if(doaction==1){
		var sealid=document.all.DWebSignSeal.HandWrite(0,255,id);
	}
	if (sealid == "") {
		alert("���»���дʧ�ܣ�");
	}
	return sealid;
}
/****************************************************************************************************

��������GetSealData					��ȡǩ������
��  ����sid							ӡ�»�ǩ����id������Ϊ�գ�Ϊ�����ȡȫ��ҳ���ǩ�����ݣ���id���ȡ����id��ǩ������

*****************************************************************************************************/
function GetSealData(sid) {
	var WebObj = document.getElementById("DWebSignSeal");
	
	var v = WebObj.GetStoreDataEx(sid);
	
	if(v.length < 200){
		v="";
	}
	return v;
}
/****************************************************************************************************

��������SetSealData					�ٴμ��ز���ʾǩ������
��  ����sealdata					�����ǩ������
		stype						�������ͣ�0 �󶨹̶��ַ���1 ��ָ���༭��id
		stxt						�������ݣ�
										��stypeΪ0ʱ��Ϊ�̶��ַ���
										��stypeΪ1ʱ��Ϊ�գ�������
		scheck						У�����ݣ�0 ��У�飬1У��

*****************************************************************************************************/
function SetSealData(sealdata,stype,stxt,scheck) {
	var WebObj = document.getElementById("DWebSignSeal");
	
	WebObj.SetStoreData(sealdata);
	WebObj.ShowWebSeals();
	strObjectName = WebObj.FindSeal("",0);
	while(strObjectName  != ""){
		if(stype==0){
			WebObj.SetSealSignData(strObjectName,stxt);
		}
		WebObj.SetDocAutoVerify(strObjectName,scheck);
		strObjectName = WebObj.FindSeal(strObjectName,0);
	}
}
/****************************************************************************************************

��������SetSealDataEx				ֻ����ǩ������
��  ����sealdata					�����ǩ������

*****************************************************************************************************/
function SetSealDataEx(sealdata) {
	var WebObj = document.getElementById("DWebSignSeal");
	WebObj.SetStoreData(sealdata);
}
/****************************************************************************************************

��������MoveSeal					�ı�ӡ��λ��
��  ����id							ӡ��id
		sid							��ʾ��λ�ã����λ�õ�����div��td��id
		sposition					��ʾλ�õ�ƫ��ֵ����԰���������Ͻ�0,0����ʽΪx:y   ���� 200:200

*****************************************************************************************************/
function MoveSeal(id,sid,sposition) {
	var WebObj = document.getElementById("DWebSignSeal");

	var str=sposition.split(":");

	WebObj.MoveSealPosition(id, str[0], str[1], sid);
}
/****************************************************************************************************

��������MoveSealEx					�ı�ӡ��λ��
��  ����stype						�������ͣ�0 �󶨹̶��ַ���1 ��ָ���༭��id
		stxt						�������ݣ�
										��stypeΪ0ʱ��Ϊ�̶��ַ���
										��stypeΪ1ʱ��Ϊ�գ�������
		scheck						У�����ݣ�0 ��У�飬1У��
		sposition					��ʾλ�õ�ƫ��ֵ����԰���������Ͻ�0,0����ʽΪx:y   ���� 200:200

*****************************************************************************************************/
function MoveSealEx(stype,stxt,scheck,sposition) {
	var WebObj = document.getElementById("DWebSignSeal");
	//�ƶ�λ��
	strObjectName = WebObj.FindSeal("",0);
	var str=sposition.split(":");
	while(strObjectName  != ""){
		WebObj.MoveSealPosition(strObjectName,str[0], str[1],strObjectName+"id")
		strObjectName = WebObj.FindSeal(strObjectName,0);
	}
	//��ʾӡ��
	WebObj.ShowWebSeals();
	//����У������
	strObjectName = WebObj.FindSeal("",0);
	while(strObjectName  != ""){
		if(stype==0){
			WebObj.SetSealSignData(strObjectName,stxt);
		}
		WebObj.SetDocAutoVerify(strObjectName,scheck);
		strObjectName = WebObj.FindSeal(strObjectName,0);
	}
	//����ӡ��
	WebObj.LockSealPosition("");
}
/****************************************************************************************************

��������checkData					У������ӡ�µ���Ч��
��  ������

*****************************************************************************************************/
function CheckData() {
	var WebObj = document.getElementById("DWebSignSeal");

	var strObjectName ;
	strObjectName = WebObj.FindSeal("",0);
	while(strObjectName  != ""){
		WebObj.VerifyDoc(strObjectName); 
		strObjectName = WebObj.FindSeal(strObjectName,0);
	}
}
/****************************************************************************************************

��������ShowSeal					��ʾ������ӡ��
��  ����sid							ӡ��id������Ϊ�գ�Ϊ����Ϊȫ��
		setlog						0 ���أ�1 ��ʾ

*****************************************************************************************************/
function ShowSeal(sid,setlog) {
	var WebObj = document.getElementById("DWebSignSeal");

	if(sid==""){
		var strObjectName ;
		strObjectName = WebObj.FindSeal("",0);
		while(strObjectName  != ""){
			WebObj.ShowSeal(strObjectName,setlog); 
			strObjectName = WebObj.FindSeal(strObjectName,0);
		}
	}else{
		WebObj.ShowSeal(sid,setlog);
	}
}
